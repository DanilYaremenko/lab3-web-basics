import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './telegram/telegram.module';
import { GroqModule } from './groq/groq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TelegramModule,
    GroqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
