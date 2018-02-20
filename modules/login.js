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
class Login {
    constructor(bot, config, utils) {
        this.bot = bot;
        this.config = config;
        this.utils = utils;
        this.status = {
            OK: 1,
            ERROR: 0,
            CURRENT: null,
        };
    }

    /**
     * Open login page
     * =====================
     * Browser start
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    async open_loginpage() {
        this.utils.logger("[INFO]", "login", "open_loginpage");

        await this.bot.goto('https://www.instagram.com/accounts/login/');
    }

    /**
     * Compile input
     * =====================
     * Set username
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    async set_username() {
        this.utils.logger("[INFO]", "login", "set_username");

        await this.bot.waitForSelector('input[name="username"]');
        await this.bot.type('input[name="username"]', this.config.instagram_username, { delay: 100 });
    }

    /**
     * Compile input
     * =====================
     * Set password
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    async set_password() {
        this.utils.logger("[INFO]", "login", "set_password");

        await this.bot.waitForSelector('input[name="password"]');
        await this.bot.type('input[name="password"]', this.config.instagram_password, { delay: 100 });
    }

    /**
     * Login
     * =====================
     * Press submit button
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    async submitform() {
        this.utils.logger("[INFO]", "login", "submit");

        await this.bot.waitForSelector('form button');
        let button = await this.bot.$('form button');
        await button.click();

        await this.utils.screenshot("login", "submit");
    }

    /**
     * Login check errors
     * =====================
     * Bad password or similar
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    async submitverify() {
        this.utils.logger("[INFO]", "login", "checkerrors");

        let text = "";

        try {
            text = await this.bot.$('#slfErrorAlert');
            if (text != null)
                this.status.CURRENT = this.status.ERROR;
            else
                this.status.CURRENT = this.status.OK;
        } catch (err) {
            this.status.CURRENT = this.status.OK;
        }

        if (this.status.CURRENT == this.status.ERROR) {
            let html_response = await this.bot.evaluate(body => body.innerHTML, text);
            await text.dispose();

            this.utils.logger("[ERROR]", "login", "Error: " + html_response + " (restart bot and retry...)");
            await this.utils.screenshot("login", "checkerrors_error");
        } else {
            this.utils.logger("[INFO]", "login", "password is correct");
            await this.utils.screenshot("login", "checkerrors");
        }

        this.utils.sleep(this.utils.random_interval(4, 8));

        return this.status.CURRENT;
    }

    /**
     * Login Flow
     * =====================
     * 
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    async start(login_status) {
        this.utils.logger("[INFO]", "login", "loading...");

        await this.open_loginpage();

        this.utils.sleep(this.utils.random_interval(4, 8));

        await this.set_username();

        this.utils.sleep(this.utils.random_interval(4, 8));

        await this.set_password();

        this.utils.sleep(this.utils.random_interval(4, 8));

        await this.submitform();

        this.utils.sleep(this.utils.random_interval(4, 8));

        login_status = await this.submitverify();
        this.utils.logger("[INFO]", "login", "login_status is " + login_status);

        this.utils.sleep(this.utils.random_interval(4, 8));

        return login_status;
    }
}

module.exports = (bot, config, utils) => { return new Login(bot, config, utils); };