/**
 * MODE: fdfmode_classic
 * =====================
 * Defollow all your following (not defollow users in whitelist) | 90 defollow/hour.
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <support@ptkdev.io> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
const Manager_state = require("../common/state").Manager_state;
class Fdfmode_classic extends Manager_state {
    constructor(bot, config, utils) {
        super();
        this.bot = bot;
        this.config = config;
        this.utils = utils;
        this.LOG_NAME = "like";
        this.Manager_state = require("../common/state").Manager_state;
        this.Log = require("../logger/Log");
        this.cache_hash_tags = [];
        this.log = new this.Log(this.LOG_NAME);
    }
}

module.exports = (bot, config, utils) => { return new Fdfmode_classic(bot, config, utils); };