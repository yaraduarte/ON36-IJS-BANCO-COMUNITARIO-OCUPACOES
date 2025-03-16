import { Test, TestingModule } from '@nestjs/testing';
import { ContaService } from '../../application/services/conta.service';
import { ContaRepository } from '../../infra/repositories/contaRepository';
import Conta from '../../domain/models/conta.model';

describe('ContaService', () => {
  let contaService: ContaService;
  let contaRepository: ContaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContaService,
        {
          provide: ContaRepository,
          useValue: {
            lerContas: jest.fn(),
            salvarConta: jest.fn(),
            deletarConta: jest.fn(),
          },
        },
      ],
    }).compile();

    contaService = module.get<ContaService>(ContaService);
    contaRepository = module.get<ContaRepository>(ContaRepository);
  });

  it('deve obter todas as contas', () => {
    const contasMock: Conta[] = [{ codigo: 1, saldo: 1000, tipo: 1 }];
    jest.spyOn(contaRepository, 'lerContas').mockReturnValue(contasMock);

    expect(contaService.obterContas()).toEqual(contasMock);
  });

  it('deve criar ou atualizar uma conta', () => {
    const conta: Conta = { codigo: 2, saldo: 500, tipo: 1 };
    jest.spyOn(contaRepository, 'salvarConta').mockImplementation();

    expect(contaService.criarOuAtualizarConta(conta)).toEqual(conta);
    expect(contaRepository.salvarConta).toHaveBeenCalledWith(conta);
  });

  it('deve deletar uma conta existente', () => {
    jest.spyOn(contaRepository, 'deletarConta').mockReturnValue(true);

    expect(contaService.deletarConta(2)).toBe(true);
    expect(contaRepository.deletarConta).toHaveBeenCalledWith(2);
  });

  it('deve retornar falso ao tentar deletar uma conta inexistente', () => {
    jest.spyOn(contaRepository, 'deletarConta').mockReturnValue(false);

    expect(contaService.deletarConta(99)).toBe(false);
    expect(contaRepository.deletarConta).toHaveBeenCalledWith(99);
  });
});