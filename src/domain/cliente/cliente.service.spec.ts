import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { ClienteRepository } from '../../adapters/cliente/clienteRepository';
import Cliente from '../../domain/cliente/cliente.model';

describe('ClienteService', () => {
  let service: ClienteService;
  let repository: ClienteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService, ClienteRepository],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repository = module.get<ClienteRepository>(ClienteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should obtain clients', () => {
    const clienteMock: Cliente[] = [
      new Cliente('João Silva', '1', 'Rua A', '123456789', 'joao.silva@example.com'),
    ];
    jest.spyOn(repository, 'lerClientes').mockReturnValue(clienteMock);
    expect(service.obterClientes()).toEqual(clienteMock);
  });

  it('should create or update client', () => {
    const clienteMock = new Cliente('Maria Oliveira', '2', 'Rua B', '987654321', 'maria.oliveira@example.com');
    jest.spyOn(repository, 'salvarCliente').mockImplementation(() => {});
    expect(service.criarOuAtualizarCliente(clienteMock)).toEqual(clienteMock);
  });

  it('should delete client', () => {
    jest.spyOn(repository, 'deletarCliente').mockReturnValue(true);
    expect(service.deletarCliente('1')).toBe(true);
  });
});
