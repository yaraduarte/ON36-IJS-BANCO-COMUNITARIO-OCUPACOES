import { Test, TestingModule } from '@nestjs/testing';
import { ContaPoupancaService } from './conta-poupanca.service';
import ContaPoupanca from './conta-poupanca.model';
import { ContaRepository } from '../conta/contaRepository';
import SaqueResult from 'src/interfaces/saqueResult';

describe('ContaPoupancaService', () => {
  let service: ContaPoupancaService;
  let repository: ContaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaPoupancaService, ContaRepository],
    }).compile();

    service = module.get<ContaPoupancaService>(ContaPoupancaService);
    repository = module.get<ContaRepository>(ContaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should deposit into an account', () => {
    const contaMock = new ContaPoupanca(1, 0.02, 200);
    jest.spyOn(repository, 'lerContas').mockReturnValue([contaMock]);
    jest.spyOn(repository, 'salvarConta').mockImplementation(() => {});
    expect(service.depositar(1, 500)).toEqual({
      codigo: 1,
      saldo: 700,
      taxaJuros: 0.02,
      tipo: 'POUPANCA'
    });
  });

  it('should withdraw from an account', () => {
    const contaMock = new ContaPoupanca(1, 0.02, 200);
    jest.spyOn(repository, 'lerContas').mockReturnValue([contaMock]);
    jest.spyOn(repository, 'salvarConta').mockImplementation(() => {});
    const result: SaqueResult = service.sacar(1, 150);
    expect(result.saqueRealizado).toBe(true);
    expect(result.mensagem).toBe('Novo saldo da conta = R$50');
  });

  it('should transfer funds between accounts', () => {
    const contaOrigem = new ContaPoupanca(1, 0.02, 200);
    const contaDestino = new ContaPoupanca(2, 0.01, 100);
    jest.spyOn(repository, 'lerContas').mockReturnValue([contaOrigem, contaDestino]);
    jest.spyOn(repository, 'salvarConta').mockImplementation(() => {});
    const result = service.transferir(1, 150, 2);
    expect(result['transferenciaRealizada']).toBe(true);
    expect(result['mensagem']).toBe('Transferência realizada');
  });
});
