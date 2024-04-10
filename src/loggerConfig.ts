import { configure, getLogger } from 'log4js';

configure({
    appenders: {
        application: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: 'logs/application.log',
            compression: true,
            maxLogSize: 10485760,
            backups: 1000
        }
    },
    categories: {
        default: {
            appenders: ['application', 'file'],
            level: 'info'
        }
    }
});

export const logger = getLogger();

// import { logger } from './loggerConfig';

// logger.trace('logger.trace');

// logger.debug('logger.debug');

// logger.info('logger.info');

// logger.warn('logger.warn');

// logger.error('logger.error');

// logger.fatal('logger.fatal');
