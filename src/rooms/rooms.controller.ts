import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Socket } from 'socket.io';
import { JoinRoomService } from 'src/join-room/join-room.service';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private joinedRoomService: JoinRoomService) {}

  @Get()
  async getListRoom(@Body() socketId: Socket) {
    return this.joinedRoomService.getRoom(socketId);
  }
}
