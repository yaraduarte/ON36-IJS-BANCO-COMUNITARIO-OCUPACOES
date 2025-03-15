import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../../../src/application/services/cliente.service';
import { ClienteRepository } from '../../../src/infra/repositories/clienteRepository';
import Cliente from '../../../src/domain/models/cliente.model';

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let clienteRepository: ClienteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: ClienteRepository,
          useValue: {
            lerClientes: jest.fn(),
            salvarCliente: jest.fn(),
            deletarCliente: jest.fn(),
          },
        },
      ],
    }).compile();

    clienteService = module.get<ClienteService>(ClienteService);
    clienteRepository = module.get<ClienteRepository>(ClienteRepository);
  });

  it('deve obter todos os clientes', () => {
    const clientesMock: Cliente[] = [
      { id: '1', nome: 'Cliente 1', email: 'cliente1@email.com', telefone: '123456789', endereco: 'Rua A, 123', contas: [] },
      { id: '2', nome: 'Cliente 2', email: 'cliente2@email.com', telefone: '987654321', endereco: 'Rua B, 456', contas: [] },
    ];
    jest.spyOn(clienteRepository, 'lerClientes').mockReturnValue(clientesMock);

    const result = clienteService.obterClientes();
    expect(result).toEqual(clientesMock);
    expect(clienteRepository.lerClientes).toHaveBeenCalledTimes(1);
  });

  it('deve criar ou atualizar um cliente', () => {
    const clienteMock: Cliente = {
      id: '1',
      nome: 'Novo Cliente',
      email: 'novo@email.com',
      telefone: '999999999',
      endereco: 'Rua Exemplo, 123',
      contas: []
    };
    jest.spyOn(clienteRepository, 'salvarCliente').mockImplementation();

    const result = clienteService.criarOuAtualizarCliente(clienteMock);
    expect(result).toEqual(clienteMock);
    expect(clienteRepository.salvarCliente).toHaveBeenCalledWith(clienteMock);
  });

  it('deve deletar um cliente pelo ID', () => {
    jest.spyOn(clienteRepository, 'deletarCliente').mockReturnValue(true);

    const result = clienteService.deletarCliente('1');
    expect(result).toBe(true);
    expect(clienteRepository.deletarCliente).toHaveBeenCalledWith('1');
  });
});
