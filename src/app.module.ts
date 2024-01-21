import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { MeModule } from './me/me.module';

@Module({
  imports: [
    // Load .env file for environment variables
    ConfigModule.forRoot({
      isGlobal: true, // If set to true, ConfigModule will be global module
    }),
    // Set up Sequelize with PostgreSQL connection
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST, // Environment variable for DB host
      port: +process.env.DB_PORT, // Environment variable for DB port, cast to number
      username: process.env.DB_USERNAME, // Environment variable for DB username
      password: process.env.DB_PASSWORD, // Environment variable for DB password
      database: process.env.DB_DATABASE, // Environment variable for DB name
      autoLoadModels: true, // Automatically discover models
      synchronize: process.env.DB_SYNCHRONIZE === 'true', // Synchronize models with the database
    }),
    AuthModule,
    UsersModule,
    AdminModule,
    MeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
