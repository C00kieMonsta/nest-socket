import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

// you can specify the port number if you do not want to serve WS on same port as nest app
@WebSocketGateway(3001)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init AppGateway');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // message sent to original emitter
  // @SubscribeMessage('messageToServer')
  // handleMessage(client: Socket, text: string): WsResponse<string> {
  //   return { event: 'messageToClient', data: text };
  // }

  // message sent to all
  @SubscribeMessage('messageToServer')
  handleMessageToAll(client: any, text: any): void {
    this.wss.emit('messageToClient', text);
  }
}
