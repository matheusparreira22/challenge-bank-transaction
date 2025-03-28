import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from 'src/domain/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      // envFilePath: ['.env', '.env.development.local'],
      // cache: true,
      // expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    UserModule,
  ],
})
export class AppModule {}
