import { Module } from '@nestjs/common';
import { GroqClient } from './groq.client';

@Module({
  providers: [GroqClient],
  exports: [GroqClient],
})
export class GroqModule {}
