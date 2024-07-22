import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST', 'localhost'),
        port: configService.get<number>('MYSQL_PORT', 3306),
        username: configService.get<string>('MYSQL_USERNAME', 'root'),
        password: configService.get<string>('MYSQL_PASSWORD', 'root'),
        database: configService.get<string>('MYSQL_DATABASE', 'task-manager'),
        // entities: [User, Task],
        synchronize: true,
        // // Автозагрузка сущностей зарегистрированных с помощью forFeature()
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Task]),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [UsersController, TasksController],
  providers: [
    UsersService,
    TasksService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
