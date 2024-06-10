import { Injectable, NestMiddleware } from "@nestjs/common";
import { WinstonAdapter } from "../adapters/winston.adapter";

@Injectable()
export class WinstonMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: WinstonAdapter
    ) { }

    use(req: any, res: any, next: (error?: any) => void) {
        const { method, originalUrl } = req;
        const createdAt = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - createdAt;

            this.logger.log(`Method: ${method}  Path: ${originalUrl} StatusCode: ${statusCode} - ${duration}ms`);
        })

        next();
    }

}