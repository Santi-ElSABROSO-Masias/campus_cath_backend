import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [AuthModule, UsersModule, CoursesModule, EnrollmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
