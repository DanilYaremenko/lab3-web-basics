import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import { GroqModule } from '../groq/groq.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    GroqModule,
  ],
  controllers: [],
  providers: [TelegramService, TelegramController],
})
export class TelegramModule {}
