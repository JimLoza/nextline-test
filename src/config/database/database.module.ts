import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrmModuleNest } from '@nestjs/typeorm';
import { envs } from '../envs';

@Module({
    imports: [
        TypeOrmModuleNest.forRoot({
            type: 'mysql',
            host: envs.database.host,
            port: envs.database.port,
            username: envs.database.username,
            password: envs.database.password,
            database: envs.database.name,
            // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true
        })
    ],
    exports: [DatabaseModule]
})
export class DatabaseModule { }
