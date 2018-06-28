/**
 * Login Flow
 * =====================
 * Open browser, set user/pass and try login
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.5
 * @changelog:  0.1 initial release
 *              0.2 new pattern with webdriverio
 *              0.5 new pattern with puppeteer
 *
 */
const Manager_state = require("../common/state").Manager_state;
class Login extends Manager_state {
    constructor(bot, config, utils) {
        super();
        this.bot = bot;
        this.config = config;
        this.utils = utils;
        this.LOG_NAME = "login";
        this.STATE = require("../common/state").STATE;
        this.STATE_EVENTS = require("../common/state").EVENTS;
        this.Log = require("../logger/Log");
        this.log = new this.Log(this.LOG_NAME);
    }

    /**
     * Open login page
     * =====================
     * Browser start
     *
     */
    async open_loginpage() {
        this.log.info("open_loginpage");

        await this.bot.goto("https://www.instagram.com/accounts/login/");
    }

    /**
     * Compile input
     * =====================
     * Set username
     *
     */
    async set_username() {
        this.log.info("set_username");
        await this.bot.waitForSelector("input[name=\"username\"]");
        await this.bot.type("input[name=\"username\"]", this.config.instagram_username, { delay: 100 });
    }

    /**
     * Compile input
     * =====================
     * Set password
     *
     */
    async set_password() {
        this.log.info("set_password");
        await this.bot.waitForSelector("input[name=\"password\"]");
        await this.bot.type("input[name=\"password\"]", this.config.instagram_password, { delay: 100 });
    }

    /**
     * Login
     * =====================
     * Press submit button
     *
     */
    async submitform() {
        this.log.info("submit");
        await this.bot.waitForSelector("form button");
        let button = await this.bot.$("form button");
        await button.click();

        await this.utils.screenshot(this.LOG_NAME, "submit");
    }

    /**
     * Login check errors
     * =====================
     * Bad password or similar
     *
     */
    async submitverify() {
        this.log.info("checkerrors");

        let text = "";

        try {
            text = await this.bot.$("#slfErrorAlert");
            if (text !== null)
                this.emit(this.STATE_EVENTS.CHANGE_STATUS, this.STATE.ERROR);
            else
                this.emit(this.STATE_EVENTS.CHANGE_STATUS, this.STATE.OK);
        } catch (err) {
            this.emit(this.STATE_EVENTS.CHANGE_STATUS, this.STATE.OK);
        }

        if (this.is_error()) {
            let html_response = await this.bot.evaluate(body => body.innerHTML, text);
            await text.dispose();

            this.log.error("Error: " + html_response + " (restart bot and retry...)");
            await this.utils.screenshot(this.LOG_NAME, "checkerrors_error");
        } else {
            this.log.info("password is correct");
            await this.utils.screenshot(this.LOG_NAME, "checkerrors");
        }

        this.utils.sleep(this.utils.random_interval(4, 8));
    }

    /**
     * Login Flow
     * =====================
     *
     */
    async start() {
        this.log.info("loading...");

        await this.open_loginpage();

        this.utils.sleep(this.utils.random_interval(4, 8));

        await this.set_username();

        this.utils.sleep(this.utils.random_interval(4, 8));

        await this.set_password();

        this.utils.sleep(this.utils.random_interval(4, 8));

        await this.submitform();

        this.utils.sleep(this.utils.random_interval(4, 8));

        await this.submitverify();
        this.log.info("login_status is " + this.get_status());

        this.utils.sleep(this.utils.random_interval(4, 8));
    }
}

module.exports = (bot, config, utils) => { return new Login(bot, config, utils); };