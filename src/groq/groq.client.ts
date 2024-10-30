import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

@Injectable()
export class GroqClient {
  private groq: Groq;

  constructor(private readonly configService: ConfigService) {
    const groqKey = this.configService.get<string>('GROQ_API_KEY');
    this.groq = new Groq({ apiKey: groqKey });
  }

  async getChatCompletion(message: string): Promise<string> {
    const response = await this.groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama3-8b-8192',
    });

    return response.choices[0]?.message?.content || '';
  }
}
