import { Test, TestingModule } from '@nestjs/testing';
import { ContaCorrenteController } from './conta-corrente.controller';
import { ContaCorrenteService } from './conta-corrente.service';
import ContaCorrente from './conta-corrente.model';

describe('ContaCorrenteController', () => {
  let controller: ContaCorrenteController;
  let service: ContaCorrenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaCorrenteController],
      providers: [ContaCorrenteService],
    }).compile();

    controller = module.get<ContaCorrenteController>(ContaCorrenteController);
    service = module.get<ContaCorrenteService>(ContaCorrenteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should deposit into an account', () => {
    const contaMock = new ContaCorrente(1, 1000, 200);
    jest.spyOn(service, 'depositar').mockReturnValue(contaMock);
    expect(controller.depositar(1, 500)).toEqual(contaMock);
  });

  it('should withdraw from an account', () => {
    const result = { saqueRealizado: true, mensagem: 'Novo saldo da conta = R$-1300' };
    jest.spyOn(service, 'sacar').mockReturnValue(result);
    expect(controller.sacar(1, 1500)).toEqual(result);
  });

  it('should transfer funds between accounts', () => {
    const result = { transferenciaRealizada: true, mensagem: 'Transferência realizada' };
    jest.spyOn(service, 'transferir').mockReturnValue(result);
    expect(controller.transferir(1, 500, 2)).toEqual(result);
  });
});
