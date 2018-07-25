<p align="center"><a href="https://instagram.bot.ptkdev.io" alt="Screenshot"><img src="https://ptkdev.it/img/bot/instagram-bot-lib.png"></a></p>

<p align="center"><h1 align="center">Instagram Bot (Library)</h1></p>

<p align="center"><a href="#" alt="License"><img src="https://img.shields.io/badge/license-GLPv3-brightgreen.svg"></a>
<a href="https://github.com/GoogleChrome/puppeteer" alt="powered by puppeteer"><img src="https://img.shields.io/badge/powered%20by-puppeteer-46aef7.svg"></a>
<a href="https://github.com/social-manager-tools/instagram-bot.js/releases" alt="Version"><img src="https://img.shields.io/badge/version-v0.8.1-lightgrey.svg"></a>
<a href="https://slack.ptkdev.io" alt="Slack Chat"><img src="https://img.shields.io/badge/chat%20on-Slack-orange.svg"></a>
<a href="http://blog.ptkdev.io" alt="Blog"><img src="https://img.shields.io/badge/blog-medium-2AE176.svg"></a>
<a href="https://twitter.com/ptkdevio" alt="Twitter"><img src="https://img.shields.io/badge/twitter-ptkdevio-2AA3EF.svg"></a>   
<a href="mailto:support@ptkdev.io" alt="Support: support@ptkdev.io"><img src="https://img.shields.io/badge/help-support@ptkdev.io-fbbc05.svg"></a></p>
<p align="center"><a href="http://patreon.ptkdev.io" alt="Patreon Backer"><img src="https://img.shields.io/badge/donate-patreon-F87668.svg"></a> <a href="http://paypal.ptkdev.io" alt="Paypale Donate"><img src="https://img.shields.io/badge/donate-paypal-46AFE0.svg"></a> <a href="http://coffee.ptkdev.io" alt="Ko-fi Donate"><img src="https://img.shields.io/badge/buy%20me-coffee-4B788C.svg"></a></p>

<p align="center"><a href="https://instagram.bot.ptkdev.io" alt="Screenshot"><img src="https://ptkdev.it/img/bot/ptkdev-instagram-bot.gif"></a></p>

## What does it do
This library (node module) provides api for include <a href="https://github.com/social-manager-tools/instagram-bot.js">instagram-bot.js</a> function in your application.

## Features
* [✓] Easy to use
* [✓] Login
* [✓] 2FA (bad location)
* [✓] 2FA (sms pin enabled)
* [✓] Multi-Session
* [✓] Multi-Platform (Windows 10, Mac OSX, Linux, [Raspberry PI 3](https://github.com/social-manager-tools/instagram-bot.js/blob/master/INSTALL.md))
* [✓] Errors manager (bad pin, bad password)
* [✓] Screenshot and Verbose logger
* [✓] Like Mode Classic: bot select random hashtag from config list and like 1 random photo and repeat this all time.
* [✓] Like Mode Realistic: bot select random hashtag from config list and like fast 10-12 photos, sleep 15-20min and repeat this all time. Sleep at night.
* [✓] Like Mode Competitor Users: select account, select random followers, like 10-12 photo and sleep 15-20min. Sleep at night.
* [✓] Like Mode Superlike: select random hashtag from config list and like 3 random photo of same user.
* [✓] Comment Mode Classic: select random comment and random hashtag and write comment under photo.
* [✘] Follow/Defollow Classic: follow user from random hashtag and defollow after 1h.
* [✘] Defollow All: defollow all your following (ignore users in whitelist).

## Fast usage
1. Run `npm install instagrambotlib`
2. Get [config.js](https://raw.githubusercontent.com/social-manager-tools/instagram-bot-lib/0.8.1/config.js.tpl) file for step 3, fill it properly and remove `.tpl` suffix.
3. On your code require library and run bot, example:
```
    const config = require ("./config");
    const Bot = require("instagrambotlib");
    let bot = new Bot(config);
    bot.start();
```
4. If work add star :star: at this project :heart:
5. If you want help me: <b><a href="http://paypal.ptkdev.io">donate on paypal</a></b> or become a <b><a href="http://patreon.ptkdev.io">backer on patreon</a></b>.

For advanced configuration see [INSTALL.md](https://github.com/social-manager-tools/instagram-bot-lib/blob/master/INSTALL.md).

#### 2FA: SMS Pin
If you received sms or email pin edit `loginpin.txt` and insert it on first line. Wait 50-60 seconds...

#### Tips: hide browser
Edit `config.js` and switch `chrome_headless` option to `true`.

#### Check if work:
See images in ./logs/screenshot or disable `chrome_headless` flag.

## Bugs
1. `[ERROR] login: The username you entered doesn't belong to an account. Please check your username and try again. (restart bot and retry...)`
* Why happen? Instagram desktop is in overcapacity. Happen at 12-14 and 19-21 all days. 
* Solution: Login in other time or Logout from your instagram app, and login again. Reboot bot and retry... Try and retry, and retry, and retry... Or stop bot and wait 2-3h...

2. `Error: Protocol error (Page.captureScreenshot): Target closed.`
* Why happen? macOS don't support correctly screenshot from puppeteer
* Solution: set `screenshot` on `false` in `config.js`

3. `This code is no longer valid. Please request a new one. (400) (/accounts/login/ajax/two_factor/)` 
* Why happen? Instagram bug at login
* Solution: disable at moment 2FA or try old version of chrome (edit `config.js` set `executable_path`)

## API 
Method | Description
------------ | -------------
start() | run instagram.bot.js

## Desktop setup (GUI Version)
1. Download <a href="https://socialmanagertools.ptkdev.io/">Social Manager Tools GUI</a>.
2. Run application.

## Docker setup
If you prefer to run this using Docker, an official container is available from the [Docker Hub](https://hub.docker.com/r/socialmanagertools/instagram-bot.js).

In order to run it, copy the `config.js.tpl` file, configure it as you prefer, then use it through volume mapping,
like in this example:

```sh
$ docker run \
    --restart=always \
    --name=instagram-bot \
    -d \
    -v /path/to/config.js:/app/config.js \
    socialmanagertools/instagram-bot.js &>/dev/null
```

## Roadmap
See full roadmap (open task, todo and bugs) in [project page](https://github.com/social-manager-tools/instagram-bot.js/projects?query=is%3Aopen+sort%3Aname-asc).
* ### [v0.7.X](https://github.com/social-manager-tools/instagram-bot.js/projects/1)
* ### [v0.8.X](https://github.com/social-manager-tools/instagram-bot.js/projects/2)
* ### [v0.9.X](https://github.com/social-manager-tools/instagram-bot.js/projects/3)

## Sorry for snake_case
I love :snake: snake_case syntax sorry for this :sob: don't hate me.

<a href="https://github.com/social-manager-tools" alt="Screenshot"><img src="https://socialmanagertools.ptkdev.io/img/socialmanagertools_logo.png"></a>
<h1>Social Manager Tools</h1>
<a href="https://github.com/social-manager-tools/social-manager-tools">Social Manager Tools GUI</a><br />
<a href="https://github.com/social-manager-tools/instagram-bot.js">InstagramBot.js</a> (<a href="https://github.com/social-manager-tools/instagram-bot-lib">LIB</a>)<br />
<a href="https://github.com/social-manager-tools/twitter-bot.js">TwitterBot.js</a> (<a href="https://github.com/social-manager-tools/twitter-bot-lib">LIB</a>)<br />
<a href="https://github.com/social-manager-tools/facebookpage-bot.js">FacebookPageBot.js</a> (<a href="https://github.com/social-manager-tools/facebookpage-bot-lib">LIB</a>)<br />
<a href="https://github.com/social-manager-tools/wordpress-telegram-bot.js">WordpressTelegramBot.js</a><br />
<a href="https://github.com/social-manager-tools/medium-telegram-bot.js">MediumTelegramBot.js</a>

<h1>License</h1>

GNU GENERAL PUBLIC LICENSE

Copyright (c) 2018 Patryk Rzucidło (PTKDev)
