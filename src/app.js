const chokidar = require('chokidar')
const shell = require('shelljs')
const fs = require('fs')
const config = require('../config.json')

const { log } = console
const { completePath, rcloneName, destinationPath, delugePort, torrentPath, watchDir } = config

const watcher = chokidar.watch(completePath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true,
  depth: 0
})

const callback = async path => {
    log(`${path} has been add...`)
    const namaArr = path.split('/')
    let name = namaArr[namaArr.length -1]
    name = name.replace('$', '\\$')
    const stat = fs.lstatSync(path)
    const realPath = stat.isDirectory() ? `${destinationPath}"${name}"` : destinationPath
    shell.exec(`rclone copy "${path}" ${rcloneName}:${realPath}`)
    const rcSize = shell.exec(`rclone size "${path}"`, { silent:true }).stdout.match(/\((.+?)\)/g)[0]
    log(`Soure size is ${rcSize}`)
    const remoteSize = shell.exec(`rclone size ${rcloneName}:${destinationPath}"${name}"`, { silent:true }).stdout.match(/\((.+?)\)/g)[0]
    log(`destination size is ${remoteSize}`)

    if (rcSize === remoteSize) {
      log(`${name} rclone to ${rcloneName} completely`)
      log(`Check was done, Start to find ${name} .torrent`)
      let delugeName = name.replace('\u200e', '')
      if (delugeName.includes("'")) {
        delugeName = name.replace(/(\s)/g, '\\$1').replace(/([\(\)\{\}\'])/g, '\\$1')
      } else if (delugeName.includes(";")) {
        delugeName = name.split("\ ")[0]
      } else if (delugeName.includes("`")) {
        delugeName = name.split("\ ")[0]
      } else {
        delugeName = `'${name}'`
      }
      const torrentInfo = shell.exec(`deluge-console "connect 127.0.0.1:${delugePort} ; info ${delugeName}"`, { silent:true })
      const infoArr = torrentInfo.stdout.split("\ \n")
      const targetInfo = infoArr.find(item => item.indexOf(name)!==-1)
      if (targetInfo) {
        const targetID = targetInfo.split("\n")[1].replace("ID: ", "")
        log(`finded ${name} torrent！ id was ${targetID}`)
        log(`Start copy ${targetID}.torrent to ${rcloneName}`)
        shell.exec(`rclone copy ${torrentPath}${targetID}.torrent ${rcloneName}:${watchDir}`)
      } else {
        log(`Find not ${name} torrent`)
      }
    } else {
      log(`${name} rclone failed`)
    }
}

watcher.on('add', callback)
  .on('unlink', path => log(`File ${path} has been removed`))
watcher.on('addDir', callback)
  .on('unlink', path => log(`File ${path} has been removed`))