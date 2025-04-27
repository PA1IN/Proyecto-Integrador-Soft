import { Test, TestingModule } from '@nestjs/testing';
import { UseController } from './use.controller';
import { UseService } from './use.service';

describe('UseController', () => {
  let controller: UseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseController],
      providers: [UseService],
    }).compile();

    controller = module.get<UseController>(UseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
