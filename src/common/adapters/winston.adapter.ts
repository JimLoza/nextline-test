import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston'


@Injectable()
export class WinstonAdapter implements LoggerService {
    private readonly logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'logs.log'
            })
        ],
    });

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string, trace: string) {
        this.logger.error(message, trace);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }

}