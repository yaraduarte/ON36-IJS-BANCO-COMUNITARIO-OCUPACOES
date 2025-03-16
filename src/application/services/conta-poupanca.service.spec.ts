import { Test, TestingModule } from '@nestjs/testing';
import { ContaPoupancaService } from './conta-poupanca.service';
import { ContaRepository } from '../../infra/repositories/contaRepository';
import ContaPoupanca from '../../domain/models/conta-poupanca.model';
import SaqueResult from 'src/domain/interfaces/ISaqueResult';

describe('ContaPoupancaService', () => {
  let service: ContaPoupancaService;
  let contaRepository: ContaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContaPoupancaService,
        {
          provide: ContaRepository,
          useValue: {
            lerContas: jest.fn(),
            salvarConta: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContaPoupancaService>(ContaPoupancaService);
    contaRepository = module.get<ContaRepository>(ContaRepository);
  });

  it('deve depositar um valor na conta corretamente', () => {
    const conta = new ContaPoupanca(1, 100);
    jest.spyOn(contaRepository, 'lerContas').mockReturnValue([conta]);

    const resultado = service.depositar(1, 50);

    expect(resultado.saldo).toBe(150);
    expect(contaRepository.salvarConta).toHaveBeenCalledWith(conta);
  });

  it('deve lançar erro ao tentar depositar em uma conta inexistente', () => {
    jest.spyOn(contaRepository, 'lerContas').mockReturnValue([]);
    expect(() => service.depositar(1, 50)).toThrowError('Conta de número 1 não encontrada');
  });

  it('deve sacar um valor da conta corretamente', () => {
    const conta = new ContaPoupanca(1, 200);
    jest.spyOn(contaRepository, 'lerContas').mockReturnValue([conta]);

    const resultado: SaqueResult = service.sacar(1, 100);

    expect(resultado.saqueRealizado).toBe(true);
    expect(resultado.mensagem).toBe('Novo saldo da conta = R$100');
    expect(contaRepository.salvarConta).toHaveBeenCalledWith(conta);
  });

  it('não deve permitir saque maior que o saldo', () => {
    const conta = new ContaPoupanca(1, 50);
    jest.spyOn(contaRepository, 'lerContas').mockReturnValue([conta]);

    const resultado: SaqueResult = service.sacar(1, 100);

    expect(resultado.saqueRealizado).toBe(false);
    expect(resultado.mensagem).toBe('Não é possível sacar o valor pois o saldo da conta é = R$50');
    expect(contaRepository.salvarConta).not.toHaveBeenCalled();
  });
});