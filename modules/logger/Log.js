const TYPES_LOG = require("./types");
const fs = require("fs");
const routes_log = require("./../../routes/log");

module.exports = class Log {
    constructor(func, config) {
        this.func = func;
        this.config = config;
        this.channels = [];

        this.config.log.drivers.forEach((driver) => {
            let Channel = routes_log[driver];
            if (Channel !== undefined) {
                this.set_channel(Channel());
            } else {
                console.error("channel log not found");
            }
        });
    }

    /**
     *
     * @param interface_channel
     */
    set_channel(interface_channel) {
        this.channels.push(interface_channel);
    }

    /**
     * Helper function
     *
     * @param type
     * @param message
     */
    channels_log(type, message) {
        this.channels.forEach((channel) => {
            channel.log(type, this.func, message);
        });
    }

    info(message) {
        this.channels_log(TYPES_LOG.INFO, message);
        fs.appendFile(this.config.log_path, "[INFO] " + message + "\n", function(err) {
            if (err) console.log(err);
        });
    }

    warning(message) {
        this.channels_log(TYPES_LOG.WARNING, message);
        fs.appendFile(this.config.log_path, "[WARNING] " + message + "\n", function(err) {
            if (err) console.log(err);
        });
    }

    error(message) {
        this.channels_log(TYPES_LOG.ERROR, message);
        fs.appendFile(this.config.log_path, "[ERROR] " + message + "\n", function(err) {
            if (err) console.log(err);
        });

        fs.appendFile(this.config.logerr_path, "[ERROR] " + message + "\n", function(err) {
            if (err) console.log(err);
        });
    }

    debug(message) {
        this.channels_log(TYPES_LOG.DEBUG, message);
        fs.appendFile(this.config.log_path, "[DEBUG] " + message + "\n", function(err) {
            if (err) console.log(err);
        });
    }
};