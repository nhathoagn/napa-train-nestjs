import { Test, TestingModule } from '@nestjs/testing';
import { JoinRoomService } from './join-room.service';

describe('JoinRoomService', () => {
  let service: JoinRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinRoomService],
    }).compile();

    service = module.get<JoinRoomService>(JoinRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
