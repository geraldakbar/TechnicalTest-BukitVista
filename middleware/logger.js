const pino = require('pino');

const logger = pino.pino({
    transport:{
        target:"pino-pretty"
    }
})

module.exports = logger;