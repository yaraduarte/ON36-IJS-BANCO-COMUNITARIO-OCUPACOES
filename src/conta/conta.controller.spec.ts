import { Test, TestingModule } from '@nestjs/testing';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import Conta from './conta.model';
import ContaCorrente from '../conta-corrente/conta-corrente.model';
import ContaPoupanca from '../conta-poupanca/conta-poupanca.model'; 

describe('ContaController', () => {
  let controller: ContaController;
  let service: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaController],
      providers: [ContaService],
    }).compile();

    controller = module.get<ContaController>(ContaController);
    service = module.get<ContaService>(ContaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should obtain accounts', () => {
    const contaMock: Conta[] = [
      new ContaCorrente(1, 1000, 200),
      new ContaPoupanca(2, 500, 0.05)
    ];
    jest.spyOn(service, 'obterContas').mockReturnValue(contaMock);
    expect(controller.obterContas()).toEqual(contaMock);
  });

  it('should create or update account', () => {
    const contaMock = new ContaCorrente(1, 1000, 200);
    jest.spyOn(service, 'criarOuAtualizarConta').mockReturnValue(contaMock);
    expect(controller.criarOuAtualizarConta(contaMock)).toEqual(contaMock);
  });

  it('should delete account', () => {
    jest.spyOn(service, 'deletarConta').mockReturnValue(true);
    expect(controller.deletarConta(1)).toBe(true);
  });
});
