import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import Cliente from '../../domain/cliente/cliente.model';

@Injectable()
export class ClienteRepository {
    private readonly filePath = path.resolve(__dirname, 'mock/clientes.json');

    lerClientes(): Cliente[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data) as Cliente[];
    }

    salvarClientes(clientes: Cliente[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2), 'utf-8');
    }

    salvarCliente(cliente: Cliente): void {
        const clientes = this.lerClientes();
        const index = clientes.findIndex(c => c.id === cliente.id);
        if (index !== -1) {
            clientes[index] = cliente;
        } else {
            clientes.push(cliente);
        }
        this.salvarClientes(clientes);
    }

    deletarCliente(id: string): boolean {
        const clientes = this.lerClientes();
        const index = clientes.findIndex(c => c.id === id);
        if (index !== -1) {
            clientes.splice(index, 1);
            this.salvarClientes(clientes);
            return true;
        }
        return false;
    }
}
