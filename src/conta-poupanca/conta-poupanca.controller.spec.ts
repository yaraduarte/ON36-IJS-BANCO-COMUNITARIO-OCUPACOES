import { Test, TestingModule } from '@nestjs/testing';
import { ContaPoupancaController } from './conta-poupanca.controller';

describe('ContaPoupancaController', () => {
  let controller: ContaPoupancaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaPoupancaController],
    }).compile();

    controller = module.get<ContaPoupancaController>(ContaPoupancaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
