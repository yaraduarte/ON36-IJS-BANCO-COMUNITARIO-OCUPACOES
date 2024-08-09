import { Test, TestingModule } from '@nestjs/testing';
import { ContaCorrenteService } from './conta-corrente.service';
import ContaCorrente from './conta-corrente.model';
import { ContaRepository } from '../conta/contaRepository';
import SaqueResult from 'src/interfaces/saqueResult';

describe('ContaCorrenteService', () => {
  let service: ContaCorrenteService;
  let repository: ContaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaCorrenteService, ContaRepository],
    }).compile();

    service = module.get<ContaCorrenteService>(ContaCorrenteService);
    repository = module.get<ContaRepository>(ContaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should deposit into an account', () => {
    const contaMock = new ContaCorrente(1, 1000, 200);
    jest.spyOn(repository, 'lerContas').mockReturnValue([contaMock]);
    jest.spyOn(repository, 'salvarConta').mockImplementation(() => {});
    expect(service.depositar(1, 500)).toEqual({
      codigo: 1,
      saldo: 700,
      limiteChequeEspecial: 1000,
      tipo: 'CORRENTE'
    });
  });

  it('should withdraw from an account', () => {
    const contaMock = new ContaCorrente(1, 1000, 200);
    jest.spyOn(repository, 'lerContas').mockReturnValue([contaMock]);
    jest.spyOn(repository, 'salvarConta').mockImplementation(() => {});
    const result: SaqueResult = service.sacar(1, 1500);
    expect(result.saqueRealizado).toBe(true);
    expect(result.mensagem).toBe('Novo saldo da conta = R$-1300');
  });

  it('should transfer funds between accounts', () => {
    const contaOrigem = new ContaCorrente(1, 1000, 200);
    const contaDestino = new ContaCorrente(2, 500, 100);
    jest.spyOn(repository, 'lerContas').mockReturnValue([contaOrigem, contaDestino]);
    jest.spyOn(repository, 'salvarConta').mockImplementation(() => {});
    const result = service.transferir(1, 500, 2);
    expect(result['transferenciaRealizada']).toBe(true);
    expect(result['mensagem']).toBe('Transferência realizada');
  });
});
