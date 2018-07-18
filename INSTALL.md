# Setup - Raspbian 9
#### 1. Install chromium >= v65
- `apt-get install chromium-browser`

#### 2. Install Node v8.X
1. `curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh `
2. `sudo bash nodesource_setup.sh`
3. `rm nodesource_setup.sh`
4. `sudo apt-get install nodejs`

#### 3. Run
1. Download [stable bot version](https://github.com/social-manager-tools/instagram-bot.js/releases) and extract it.
2. Run `npm install` in `instagram-bot.js` folder.
3. Rename `config.js.tpl` to `config.js`, fill it properly.
4. Start the bot via `node bot.js`
5. If work add star :star: at this project :heart:
6. If you want help me: <b><a href="http://paypal.ptkdev.io">donate on paypal</a></b> or become a <b><a href="http://patreon.ptkdev.io">backer on patreon</a></b>.

#### 4. Use raspbian chromium, not the node_modules version
- Edit `config.js` and set `executable_path` to `/usr/bin/chromium-browser` in puppeteer section.

#### 5. You don't have monitor?
- Edit `config.js` and set `chrome_headless` to `true`, is mandatory.

# Setup - Raspbian 8
#### 1. Install chromium v60
- `apt-get install chromium-browser`

#### 2. Install Node v8
1. `curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh `
2. `sudo bash nodesource_setup.sh`
3. `rm nodesource_setup.sh`
4. `sudo apt-get install nodejs`

#### 3. Update chromium v60 to v64
```
wget http://launchpadlibrarian.net/252010249/libfontconfig1_2.11.94-0ubuntu1_armhf.deb
wget https://launchpad.net/~chromium-team/+archive/ubuntu/stable/+build/14349678/+files/chromium-codecs-ffmpeg_64.0.3282.167-0ubuntu0.17.10.1_armhf.deb
wget https://launchpad.net/~chromium-team/+archive/ubuntu/stable/+build/14349678/+files/chromium-browser_64.0.3282.167-0ubuntu0.17.10.1_armhf.deb

sudo dpkg -i libfontconfig1_2.11.94-0ubuntu1_armhf.deb
sudo dpkg -i chromium-codecs-ffmpeg_64.0.3282.167-0ubuntu0.17.10.1_armhf.deb
sudp dpkg -i chromium-browser_64.0.3282.167-0ubuntu0.17.10.1_armhf.deb
```

#### 4. If you have problem with libc dependieces you need update raspbian to testing:
- Edit `sudo vi /etc/apt/source.list` and switch `stretch` to `testing`
- Run `sudo apt-get update && sudo apt-get dist-upgrade`

#### 5. Run
1. Download [stable bot version](https://github.com/social-manager-tools/instagram-bot.js/releases) and extract it.
2. Run `npm install` in `instagram-bot.js` folder.
3. Rename `config.js.tpl` to `config.js`, fill it properly.
4. Start the bot via `node bot.js`
5. If work add star :star: at this project :heart:
6. If you want help me: <b><a href="http://paypal.ptkdev.io">donate on paypal</a></b> or become a <b><a href="http://patreon.ptkdev.io">backer on patreon</a></b>.

#### 6. Use raspbian chromium, not the node_modules version
- Edit `config.js` and set `executable_path` to `/usr/bin/chromium-browser` in puppeteer section:

#### 7. You don't have monitor?
- Edit `config.js` and set `chrome_headless` to `true`, is mandatory.

# Setup - Debian Server
#### 1. Install bot dependencies:
1. `sudo apt-get install build-essential xvfb libssl-dev curl wget git chromium xauth`

#### 2. Install Node on Debian
1. `curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh `
2. `sudo bash nodesource_setup.sh`
3. `rm nodesource_setup.sh`
4. `sudo apt-get install nodejs`

#### 3. Run
1. Download [stable bot version](https://github.com/social-manager-tools/instagram-bot.js/releases) and extract it.
2. Run `npm install` in `instagram-bot.js` folder.
3. Rename `config.js.tpl` to `config.js`, fill it properly.
4. Start the bot via `node bot.js`
5. If work add star :star: at this project :heart:
6. If you want help me: <b><a href="http://paypal.ptkdev.io">donate on paypal</a></b> or become a <b><a href="http://patreon.ptkdev.io">backer on patreon</a></b>.

#### 4. You don't have monitor?
- Edit `config.js` and set `chrome_headless` to `true`, is mandatory.

# Pin
If you received sms or email pin edit `loginpin.txt` and insert it on first line. Wait 50-60 seconds...

# Check if work:
See logs with pm2: `cat ./logs/debug.log` or png images in ./logs/screenshot
