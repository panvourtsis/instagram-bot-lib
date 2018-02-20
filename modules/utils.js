/**
 * Utils
 * =====================
 * Logger and other functions...
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.5
 * @changelog:  0.1 initial release
 *              0.2 new pattern
 *              0.3 new sleep system
 *
 */
class Utils {
    constructor(bot, config, rx, event_emitter) {
        this.bot = bot;
        this.config = config;
        this.rx = rx;
        this.event_emitter = event_emitter;
    }

    /**
     * Logger
     * =====================
     * Better than console.log() 
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    logger(type, func, text) {
        console.log(type + " " + func + ": " + text);

        // @TODO: add Observable here
    }

    /**
     * Screenshot
     * =====================
     * Save screenshot from chrome
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    async screenshot(func, name) {
        /*try{
            await this.bot.screenshot({ path: './logs/screenshot/' + this.config.instagram_username + '_' + func + '_' + name + '.jpg' });
        } catch (err) {
            this.logger("[WARNING]", "screenshot", "error "+ err);
        }*/

        // @TODO: this is bad for module, add path and other info and Observable
        
    }

    /**
     * Random
     * =====================
     * Random number between two numbers
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    random_interval(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
    }

    /**
     * Sleep
     * =====================
     * Zzz
     *
     * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
     * @license:    This code and contributions have 'GNU General Public License v3'
     * @version:    0.1
     * @changelog:  0.1 initial release
     *
     */
    sleep(sec) {
        let sleep = require('system-sleep');
        sleep(sec);
    }

}

module.exports = (bot, config, utils) => { return new Utils(bot, config, utils); };