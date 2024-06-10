import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { WinstonAdapter } from './adapters/winston.adapter';

@Module({
    providers: [BcryptAdapter, WinstonAdapter],
    exports: [BcryptAdapter, WinstonAdapter],
})
export class CommonModule { }
