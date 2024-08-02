import { Test, TestingModule } from '@nestjs/testing';
import { ContaPoupancaService } from './conta-poupanca.service';

describe('ContaPoupancaService', () => {
  let service: ContaPoupancaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaPoupancaService],
    }).compile();

    service = module.get<ContaPoupancaService>(ContaPoupancaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
