import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertsGateway } from './alerts/alerts.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, AlertsGateway],
})
export class AppModule {}
