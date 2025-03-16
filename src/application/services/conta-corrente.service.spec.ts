import { Test, TestingModule } from '@nestjs/testing';
import { ContaCorrenteService } from './conta-corrente.service';
import { ContaRepository } from '../../infra/repositories/contaRepository';
import ContaCorrente from '../../domain/models/conta-corrente.model';

describe('ContaCorrenteService', () => {
  let service: ContaCorrenteService;
  let repository: ContaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContaCorrenteService,
        {
          provide: ContaRepository,
          useValue: {
            lerContas: jest.fn(),
            salvarConta: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContaCorrenteService>(ContaCorrenteService);
    repository = module.get<ContaRepository>(ContaRepository);
  });

  it('deve depositar em uma conta existente', () => {
    const conta = new ContaCorrente(1, 100, 50);
    jest.spyOn(repository, 'lerContas').mockReturnValue([conta]);
    jest.spyOn(repository, 'salvarConta');

    const resultado = service.depositar(1, 50);

    expect(resultado.saldo).toBe(150);
    expect(repository.salvarConta).toHaveBeenCalledWith(resultado);
  });

  it('deve sacar dentro do saldo disponível', () => {
    const conta = new ContaCorrente(1, 100, 50);
    jest.spyOn(repository, 'lerContas').mockReturnValue([conta]);
    jest.spyOn(repository, 'salvarConta');

    const resultado = service.sacar(1, 50);

    expect(resultado.saqueRealizado).toBe(true);
    expect(resultado.mensagem).toContain('Novo saldo da conta');
    expect(repository.salvarConta).toHaveBeenCalled();
  });

  it('deve sacar usando o limite do cheque especial', () => {
    const conta = new ContaCorrente(1, 100, 50);
    jest.spyOn(repository, 'lerContas').mockReturnValue([conta]);
    jest.spyOn(repository, 'salvarConta');

    const resultado = service.sacar(1, 120);

    expect(resultado.saqueRealizado).toBe(true);
    expect(resultado.mensagem).toContain('Novo saldo da conta');
  });

  it('não deve permitir saque maior que saldo + limite', () => {
    const conta = new ContaCorrente(1, 100, 50);
    jest.spyOn(repository, 'lerContas').mockReturnValue([conta]);

    const resultado = service.sacar(1, 200);

    expect(resultado.saqueRealizado).toBe(false);
    expect(resultado.mensagem).toContain('Não é possível sacar');
  });

  it('deve lançar erro ao tentar encontrar conta inexistente', () => {
    jest.spyOn(repository, 'lerContas').mockReturnValue([]);

    expect(() => service.depositar(1, 50)).toThrow('Conta de número 1 não encontrada');
  });
});