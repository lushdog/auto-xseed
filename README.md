# auto-xseed
Automatically cross seed on another seedbox.

Transfer file from a seedbox to your another seedbox and automatically cross seed.

## To install

install nodejs

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

`source ~/.profile`

`nvm install stable`

`npm install pm2 -g`

clone code

`git clone https://github.com/lushdog/auto-xseed.git`

`npm install`

Copy `config.example.json` to `config.json`

## Set up rclone
see `https://rclone.org/`

## To run

`pm2 start index.js --name xseed`

## Log

`pm2 log xseed`

## Config

```javascript
{
  "completePath": "/home/xx/deluge/complete", // deluge complete torrent dir. Make sure to set deluge `Move completed to:` option
  "rcloneName": "god", // rclone name, set up rclone to transfer file to your another seedbox.
  "delugePort": 37892, // deluge daemon port
  "torrentPath": "/home/xx/.config/deluge/state/", // deluge state path.
  "destinationPath": "/home/xx/torrents/rtorrent/", // Your another seedbox's client default download dir.
  "watchDir": "/home/xx/rwatch" // Your another seedbox's client watch dir.
}
```

