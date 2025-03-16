import { Injectable } from '@nestjs/common';
import Cliente from '../../domain/models/cliente.model';
import { ClienteRepository } from '../../infra/repositories/clienteRepository';

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) { }

  obterClientes(): Cliente[] {
    return this.clienteRepository.lerClientes();
  }

  criarOuAtualizarCliente(cliente: Cliente): Cliente {
    this.clienteRepository.salvarCliente(cliente);
    return cliente;
  }

  deletarCliente(id: string): boolean {
    return this.clienteRepository.deletarCliente(id);
  }
}
