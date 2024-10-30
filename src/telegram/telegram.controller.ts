import { Ctx, Help, On, Start, Update } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { TelegramService } from './telegram.service';
import { TELEGRAM_MESSAGES } from '../common/telegram.messages';

@Update()
export class TelegramController {
  private isAwaitingGroqMessage = false;

  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  onStart(@Ctx() ctx): void {
    this.createNewScene(ctx);
  }

  private inclineBackButton() {
    return Markup.inlineKeyboard([[Markup.button.callback('Back', 'back')]]);
  }

  private createNewScene(@Ctx() ctx) {
    const buttons = [
      { text: 'Student', callbackData: 'student' },
      { text: 'IT-technologies', callbackData: 'it_tech' },
      { text: 'Contacts', callbackData: 'contacts' },
      { text: 'Groq', callbackData: 'groq' },
    ];

    const keyboard = Markup.inlineKeyboard(
      buttons.map((button) => [
        Markup.button.callback(button.text, button.callbackData),
      ]),
    );

    ctx.reply(TELEGRAM_MESSAGES.USER_GREETING, keyboard);
  }

  @Help()
  async help(@Ctx() ctx) {
    await ctx.reply(TELEGRAM_MESSAGES.HELP);
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx): Promise<void> {
    if ('data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;

      switch (action) {
        case 'student':
          ctx.deleteMessage();
          await ctx.replyWithHTML(
            TELEGRAM_MESSAGES.STUDENT,
            this.inclineBackButton(),
          );
          break;
        case 'it_tech':
          ctx.deleteMessage();
          await ctx.replyWithHTML(
            TELEGRAM_MESSAGES.IT_TECH,
            this.inclineBackButton(),
          );
          break;
        case 'contacts':
          ctx.deleteMessage();
          await ctx.replyWithHTML(
            TELEGRAM_MESSAGES.CONTACTS,
            this.inclineBackButton(),
          );
          break;
        case 'groq':
          ctx.deleteMessage();
          this.isAwaitingGroqMessage = true;
          await ctx.replyWithHTML(
            TELEGRAM_MESSAGES.GROQ,
            this.inclineBackButton(),
          );
          break;
        case 'back':
          ctx.deleteMessage();
          this.createNewScene(ctx);
          break;
      }
    }
  }

  @On('text')
  async onMessage(@Ctx() ctx) {
    if (this.isAwaitingGroqMessage) {
      this.isAwaitingGroqMessage = false;
      const userMessage = ctx.message.text;

      const groqResponse =
        await this.telegramService.handleMessage(userMessage);
      await ctx.replyWithHTML(groqResponse, this.inclineBackButton());
    } else {
      await ctx.replyWithHTML(
        TELEGRAM_MESSAGES.PRESS_BUTTON,
        this.inclineBackButton(),
      );
    }
  }
}
