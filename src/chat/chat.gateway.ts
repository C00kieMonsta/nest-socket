import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

const CHAT_TO_SERVER = 'chatToServer';
const CHAT_TO_CLIENT = 'chatToClient';
const JOIN_ROOM = 'joinRoom';
const JOINED_ROOM = 'joinedRoom';
const LEAVE_ROOM = 'leaveRoom';
const LEFT_ROOM = 'leftRoom';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('Init ChatGateway');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // message sent to all in specific room
  @SubscribeMessage(CHAT_TO_SERVER)
  handleMessageToAll(client: any, msg: { sender: string, room: string, message: string }): void {
    this.wss.to(msg.room).emit(CHAT_TO_CLIENT, msg);
  }

  // join room
  @SubscribeMessage(JOIN_ROOM)
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit(JOINED_ROOM, room); // warn client he joined room
  }

  // join room
  @SubscribeMessage(LEAVE_ROOM)
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit(LEFT_ROOM, room); // warn client he left room
  }

}
