import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { MoodModule } from '../src/mood/mood.module';
// import { TaskModule } from '../src/task/task.module';
// import { PlanningModule } from '../src/planning/planning.module';
// import { AnalyticsModule } from '../src/analytics/analytics.module';
// import { AiModule } from '../src/ai/ai.module';
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
    // MoodModule,
    // TaskModule,
    // PlanningModule,
    // AnalyticsModule,
    // AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
