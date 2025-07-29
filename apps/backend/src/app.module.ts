import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './db/prisma/prisma.module';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { TaskModule } from './features/task/task.module';
import { PlanningModule } from './features/planning/planning.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { DebriefModule } from './features/debrief/debrief.module';
import { config } from './config/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    TaskModule,
    PlanningModule,
    DashboardModule,
    DebriefModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
