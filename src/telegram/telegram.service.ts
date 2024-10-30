import { Injectable } from '@nestjs/common';
import { GroqClient } from '../groq/groq.client';

@Injectable()
export class TelegramService {
  constructor(private readonly groqClient: GroqClient) {}

  async handleMessage(message: string): Promise<string> {
    return this.groqClient.getChatCompletion(message);
  }
}
