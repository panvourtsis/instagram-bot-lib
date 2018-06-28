const TYPES_LOG = require("./types");

const routes_log = require("./../../routes/log");
const config = require("./../../config");

module.exports = class Log{
    constructor(func){
        this.func = func;
        this.channels = [];

        config.log.drivers.forEach((driver) => {
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
    set_channel(interface_channel){
        this.channels.push(interface_channel);
    }

    /**
     * Helper function
     *
     * @param type
     * @param message
     */
    channels_log(type,message){
        this.channels.forEach((channel) => {
            channel.log(type, this.func, message);
        });
    }

    info(message){
        this.channels_log(TYPES_LOG.INFO, message);
    }

    warning(message){
        this.channels_log(TYPES_LOG.WARNING, message);
    }

    error(message){
        this.channels_log(TYPES_LOG.ERROR, message);
    }
    
    debug(message){
        this.channels_log(TYPES_LOG.DEBUG, message);
    }
};

