import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from '../../domain/cliente/cliente.service';
import Cliente from '../../domain/cliente/cliente.model';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [ClienteService],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should obtain clients', () => {
    const clienteMock: Cliente[] = [
      new Cliente('João Silva', '1', 'Rua A', '123456789', 'joao.silva@example.com'),
    ];
    jest.spyOn(service, 'obterClientes').mockReturnValue(clienteMock);
    expect(controller.obterClientes()).toEqual(clienteMock);
  });

  it('should create or update client', () => {
    const clienteMock = new Cliente('Maria Oliveira', '2', 'Rua B', '987654321', 'maria.oliveira@example.com');
    jest.spyOn(service, 'criarOuAtualizarCliente').mockReturnValue(clienteMock);
    expect(controller.criarOuAtualizarCliente(clienteMock)).toEqual(clienteMock);
  });

  it('should delete client', () => {
    jest.spyOn(service, 'deletarCliente').mockReturnValue(true);
    expect(controller.deletarCliente('1')).toBe(true);
  });
});
