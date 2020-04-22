# auto-xseed
自动转移辅种程序，可以监听delgue下载完成，自动将文件转移到另外一个盒子上，并自动找到.torrent文件，复制到另一个盒子的监控文件夹，实现自动辅种。
使用rclone进行同步，所以也可实现下载完成自动转移到任何地方，比如自动备份到gd等网盘，自动拖到本地。只需要配置rclone即可。

## 安装

安装 nodejs

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

`source ~/.profile`

`nvm install stable`

`npm install pm2 -g`

下载代码

`git clone https://github.com/lushdog/auto-xseed.git`

`npm install`

复制 `config.example.json` 为 `config.json`

## 设置rclone
设置方法看官网 `https://rclone.org/`

## 开始运行

`pm2 start index.js --name xseed`

## 查看

`pm2 log xseed`

## 设置

```javascript
{
  "completePath": "/home/xx/deluge/complete", // deluge 下载完成移动的文件夹，在deluge设置下载目录和下载完成移动到的目录
  "rcloneName": "god", // rclone 配置的名字,
  "delugePort": 37892, // deluge daemon 端口，不是web-ui端口。
  "torrentPath": "/home/xx/.config/deluge/state/", // deluge存放种子文件的目录.
  "destinationPath": "/home/xx/torrents/rtorrent/", // 另外一个盒子的下载软件默认下载目录.
  "watchDir": "/home/xx/rwatch" // 另外一个盒子的watch文件夹.
}
```

