import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    AuthModule,
    UsersModule,
    CoursesModule,
    EnrollmentsModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
