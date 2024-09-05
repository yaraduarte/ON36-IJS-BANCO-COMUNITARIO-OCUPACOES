import { Test, TestingModule } from '@nestjs/testing';
import { ContaService } from './conta.service';
import { ContaRepository } from './contaRepository';
import Conta from './conta.model';
import ContaCorrente from '../conta-corrente/conta-corrente.model'; // Ajuste se necessário
import ContaPoupanca from '../conta-poupanca/conta-poupanca.model'; // Ajuste se necessário

describe('ContaService', () => {
  let service: ContaService;
  let repository: ContaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaService, ContaRepository],
    }).compile();

    service = module.get<ContaService>(ContaService);
    repository = module.get<ContaRepository>(ContaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should obtain accounts', () => {
    const contaMock: Conta[] = [
      new ContaCorrente(1, 1000, 200),
      new ContaPoupanca(2, 500, 0.05)
    ];
    jest.spyOn(repository, 'lerContas').mockReturnValue(contaMock);
    expect(service.obterContas()).toEqual(contaMock);
  });

  it('should create or update account', () => {
    const contaMock = new ContaCorrente(1, 1000, 200); // Use a classe concreta
    jest.spyOn(repository, 'salvarConta').mockImplementation(() => {});
    expect(service.criarOuAtualizarConta(contaMock)).toEqual(contaMock);
  });

  it('should delete account', () => {
    jest.spyOn(repository, 'deletarConta').mockReturnValue(true);
    expect(service.deletarConta(1)).toBe(true);
  });
});
