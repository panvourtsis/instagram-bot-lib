## Fast setup
1. Run `npm install instagrambotlib`
2. Get config.js file for step 3 [from here](https://github.com/social-manager-tools/instagram-bot.js/blob/0.7.4/config.js.tpl), fill it properly.
2. On your code require library, example:
```
    const config = require ("./config");
    const Bot = require("instagrambotlib");
    let bot = new Bot(config);
    bot.start();
```