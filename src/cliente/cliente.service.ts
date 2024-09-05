import { Injectable } from '@nestjs/common';
import Cliente from './cliente.model';
import { ClienteRepository } from './clienteRepository';

@Injectable()
export class ClienteService {
    constructor(private readonly clienteRepository: ClienteRepository) {}

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
