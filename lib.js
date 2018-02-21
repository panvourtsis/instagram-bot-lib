/**
 * InstagramBotLib
 * =====================
 * Instagram Bot Library made with love and nodejs
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @file:       lib.js
 * @version:    0.6.1
 *
 * @license:    Code and contributions have 'GNU General Public License v3'
 *              This program is free software: you can redistribute it and/or modify
 *              it under the terms of the GNU General Public License as published by
 *              the Free Software Foundation, either version 3 of the License, or
 *              (at your option) any later version.
 *              This program is distributed in the hope that it will be useful,
 *              but WITHOUT ANY WARRANTY; without even the implied warranty of
 *              MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *              GNU General Public License for more details.
 *              You should have received a copy of the GNU General Public License
 *              along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link        Homepage:     https://instagrambotlib.ptkdev.io
 *              GitHub Repo:  https://github.com/social-manager-tools/instagram-bot-lib
 */

/**
 * Libs
 * =====================
 * Open source library
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.5
 * @link:       https://github.com/GoogleChrome/puppeteer
 * @changelog:  0.1 initial release
 *              0.2 refactor: removed useless vars
 *              0.5 refactor: moved to puppeteer
 *
 */
const puppeteer = require('puppeteer');
const path = require('path');
const Rx = require("rxjs");
const {EventEmitter} = require("events");

const event_emitter = new EventEmitter();

function InstagramBotLib(config) {
    const likes = Rx.Observable.fromEvent(event_emitter, "like", (text) => { 
        return {
            text: text
        };
    });

    this.likes = () => {
        return likes
    };

    (async() => {
        /**
         * Init
         * =====================
         * Get username, password and hashtag of bot from /config.js
         * If not exist rename config.js.tmpl to config.js and change strings
         *
         * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
         * @license:    This code and contributions have 'GNU General Public License v3'
         * @version:    0.1
         * @changelog:  0.1 initial release
         *              0.5 refactor: moved to puppeteer
         *
         */
        const browser = await puppeteer.launch({ headless: config.chrome_headless, args: config.chrome_options });
        const bot = await browser.newPage();

        /**
         * Import libs
         * =====================
         * Modules of bot from folder ./modules
         *
         * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
         * @license:    This code and contributions have 'GNU General Public License v3'
         * @version:    0.2
         * @changelog:  0.1 initial release
         *              0.2 refactor: removed eval() and added require.
         *              0.4 added: likemode_realistic
         *
         */
        let utils = require(__dirname + '/modules/utils.js')(bot, config, rx ,event_emitter);
        let login = require(__dirname + '/modules/login.js')(bot, config, utils);
        let twofa = require(__dirname + '/modules/2FA.js')(bot, config, utils);
        let likemode_classic = require(__dirname + '/modules/likemode_classic.js')(bot, config, utils);
        let likemode_realistic = require(__dirname + '/modules/likemode_realistic.js')(bot, config, utils);

        /**
         * Bot variables
         * =====================
         * Status var if login is correct, 2FA is correct and bot start good.
         * 1 = OK
         * 0 = KO
         *
         * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
         * @license:    This code and contributions have 'GNU General Public License v3'
         * @version:    0.1
         * @changelog:  0.1 initial release
         *
         */
        let login_status = "";
        let twofa_status = 1;
        let like_status = "";
        let pin_status = "";

        /**
         * Switch Mode
         * =====================
         * Switch social algorithms, change algorithm from config.js
         * 
         * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
         * @license:    This code and contributions have 'GNU General Public License v3'
         * @version:    0.1
         * @changelog:  0.1 initial release
         *
         */
        async function switch_mode(bot, config, utils, likemode_classic, likemode_realistic) {
            if (config.bot_mode == "likemode_classic")
                await likemode_classic.start(bot, config, utils);
            else if (config.bot_mode == "likemode_realistic")
                await likemode_realistic.start(bot, config, utils);
        }

        /**
         * Start Bot (flow) 
         * =====================
         * Login --> 2FA (bad location) --> 2FA (sms pin) --> social algorithm from config.js
         *
         * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
         * @license:    This code and contributions have 'GNU General Public License v3'
         * @version:    0.1
         * @changelog:  0.1 initial release
         *
         */
        login_status = await login.start(login_status);

        if (login_status == 1) {
            pin_status = await twofa.start_twofa_location_check();

            if (pin_status == 0) {
                pin_status = await twofa.start_twofa_check();
            }

            if (pin_status == 1) {
                twofa_status = await twofa.start_twofa_location();
            } else if (pin_status == 2) {
                twofa_status = await twofa.start();
            }

            utils.logger("[INFO]", "twofa", "status " + twofa_status);

            if (twofa_status >= 1) {
                await switch_mode(bot, config, utils, likemode_classic, likemode_realistic);
            }
        }

        bot.close();

    })();
}

module.exports.InstagramBotLib = InstagramBotLib