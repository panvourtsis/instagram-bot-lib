/**
 * Utils
 * =====================
 * Logger and other functions...
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.6.2
 * @changelog:  0.1 initial release
 *              0.2 new pattern
 *              0.3 new sleep system
 *
 */
require("colors");
class Utils {
    constructor(bot, config) {
        this.bot = bot;
        this.config = config;
        this.LOG_NAME = "utils";
        this.LOG = require("../logger/types");
        this.MAP_COLORS = require("../logger/types").MAP_COLORS;
        this.Log = require("../logger/Log");
        this.log = new this.Log(this.LOG_NAME);
    }

    /**
     * Donate
     * =====================
     * Patreon link
     *
     */
    donate() {
        this.log.warning("Bot work? Please donate for support this project!");
        this.log.warning("Donate with patreon: http://patreon.ptkdev.io");
        this.log.warning("Donate with paypal: http://paypal.ptkdev.io");
    }

    /**
     * Check updates
     * =====================
     * Bot is updated? Yes/no
     *
     */
    check_updates(version) {
        let request = require("request");
        let log = this.log;
        request.get("https://api.ptkdev.io/v1/bot/instagram/version/", function(err, res, last_release) {
            if (err) {
                log.error("Is impossible contact api.ptkdev.io server, wifi is on?");
            } else {
                if (version !== last_release) {
                    log.warning("Bot release v" + last_release + " available! Current version: v" + version);
                } else {
                    log.info("Bot is updated! :D");
                }
            }
        });
    }

    /**
     * Default config.js
     * =====================
     * Get default value if config.js is not updated from config.js.tpl
     *
     */
    default_config(config) {
        if (typeof config.debug === "undefined") {
            config.debug = true;
            this.log.error("config.debug use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.login === "undefined") {
            config.login = true;
            this.log.error("config.login use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.instagram_username === "undefined") {
            config.instagram_username = "ptkdev";
            this.log.error("config.instagram_username use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.instagram_password === "undefined") {
            config.instagram_password = "password";
            this.log.error("config.instagram_password use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.instagram_hashtag === "undefined") {
            config.instagram_hashtag = ["follow"];
            this.log.error("config.instagram_hashtag use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.instagram_pin === "undefined") {
            config.instagram_pin = "sms";
            this.log.error("config.instagram_pin use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_mode === "undefined") {
            config.bot_mode = "likemode_classic";
            this.log.error("config.bot_mode use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_likeday_min === "undefined") {
            config.bot_likeday_min = 300;
            this.log.error("config.bot_likeday_min use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_likeday_max === "undefined") {
            config.bot_likeday_max = 600;
            this.log.error("config.bot_likeday_max use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_sleep_night === "undefined" || (config.bot_sleep_night !== true && config.bot_sleep_night !== false)) {
            config.bot_sleep_night = true;
            this.log.error("config.bot_sleep_night use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_start_sleep === "undefined") {
            config.bot_start_sleep = "7:00";
            this.log.error("config.bot_start_sleep use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_fastlike_min === "undefined") {
            config.bot_fastlike_min = 15;
            this.log.error("config.bot_fastlike_min use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_fastlike_max === "undefined") {
            config.bot_fastlike_max = 20;
            this.log.error("config.bot_fastlike_max use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_superlike_n === "undefined") {
            config.bot_superlike_n = 3;
            this.log.error("config.bot_superlike_n use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_followday === "undefined") {
            config.bot_followday = 300;
            this.log.error("config.bot_followday use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.bot_userwhitelist === "undefined") {
            config.bot_userwhitelist = [""];
            this.log.error("config.bot_userwhitelist use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.chrome_headless === "undefined") {
            config.chrome_headless = false;
            this.log.error("config.chrome_headless use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.chrome_options === "undefined") {
            config.chrome_options = ["--disable-gpu", "--no-sandbox", "--window-size=1920x1080"];
            this.log.error("config.chrome_options use the default value, update your config.js from config.js.tpl");
        }
        if (typeof config.executable_path === "undefined") {
            config.executable_path = "";
            this.log.error("config.executable_path use the default value, update your config.js from config.js.tpl");
        }

        return config;
    }

    /**
     * Screenshot
     * =====================
     * Save screenshot from chrome
     *
     */
    async screenshot(func, name) {
        if (this.config.log.screenshot) {
            try {
                await this.bot.screenshot({ path: "./logs/screenshot/" + this.config.instagram_username + "_" + func + "_" + name + ".jpg" });
                this.log.info("Cheese! Screenshot!");
            } catch (err) {
                this.log.error(this.LOG.WARNING, "screenshot", "error " + err);
            }
        }
    }

    /**
     * Random
     * =====================
     * Random number between two numbers
     *
     */
    random_interval(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
    }

    /**
     * Get random number between two numbers
     * @param min
     * @param max
     * @return {number}
     */
    random_number() {
        return (Math.floor(Math.random() * (20 - 10 + 1)) + 10);
    }

    /**
     * Mix array element
     * @param arr
     * @return array
     */
    mix_array(arr) {
        return arr.sort(function() { return 0.5 - Math.random(); });
    }

    /**
     * Sleep
     * =====================
     * Zzz
     *
     */
    sleep(sec) {
        let sleep = require("system-sleep");
        sleep(sec);
    }

    /**
     * Check is debug
     * @return {boolean}
     */
    is_debug() {
        return this.config.debug === true;
    }

    /**
     * Get random hash tag from config file
     * @return {string}
     */
    get_random_hash_tag() {
        return this.config.instagram_hashtag[Math.floor(Math.random() * this.config.instagram_hashtag.length)];
    }
}

module.exports = (bot, config, utils) => { return new Utils(bot, config, utils); };