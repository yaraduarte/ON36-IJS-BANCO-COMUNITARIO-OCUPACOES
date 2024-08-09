import { Test, TestingModule } from '@nestjs/testing';
import { ContaPoupancaController } from './conta-poupanca.controller';
import { ContaPoupancaService } from './conta-poupanca.service';
import ContaPoupanca from './conta-poupanca.model';

describe('ContaPoupancaController', () => {
  let controller: ContaPoupancaController;
  let service: ContaPoupancaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaPoupancaController],
      providers: [ContaPoupancaService],
    }).compile();

    controller = module.get<ContaPoupancaController>(ContaPoupancaController);
    service = module.get<ContaPoupancaService>(ContaPoupancaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should deposit into an account', () => {
    const contaMock = new ContaPoupanca(1, 0.02, 200);
    jest.spyOn(service, 'depositar').mockReturnValue(contaMock);
    expect(controller.depositar(1, 500)).toEqual(contaMock);
  });

  it('should withdraw from an account', () => {
    const result = { saqueRealizado: true, mensagem: 'Novo saldo da conta = R$50' };
    jest.spyOn(service, 'sacar').mockReturnValue(result);
    expect(controller.sacar(1, 150)).toEqual(result);
  });

  it('should transfer funds between accounts', () => {
    const result = { transferenciaRealizada: true, mensagem: 'Transferência realizada' };
    jest.spyOn(service, 'transferir').mockReturnValue(result);
    expect(controller.transferir(1, 150, 2)).toEqual(result);
  });
});
