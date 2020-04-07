import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertsGateway } from './alerts/alerts.gateway';
import { AlertsController } from './alerts/alerts.controller';

@Module({
  imports: [],
  controllers: [AlertsController],
  providers: [ChatGateway, AlertsGateway],
})
export class AppModule {}
