import { Injectable } from '@nestjs/common';
import Cliente from './cliente.model';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ClienteService {
    private readonly filePath = path.resolve('src/cliente/cliente.json')

    leClientes(): Cliente[] {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data) as Cliente[]
    }

    buscarCliente(clienteId: string): Cliente | null {
        const clientes = this.leClientes()
        return clientes.find(c => c.id === clienteId) || null
    }

    criarCliente(nome: string, id: string, endereco: string, telefone: string, email: string): boolean {
        const clientes = this.leClientes()
        if (clientes.find(c => c.id === id)) {
            console.error('Cliente já existe');
            return false;
        }

        clientes.push({ id, nome, endereco, telefone, email, contas: [] });
        fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2))
        return true;
    }

    alterarCliente(clienteId: string, nome?: string, endereco?: string, email?: string, telefone?: string): boolean {
        const clientes = this.leClientes()
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            console.error('Cliente não encontrado');
            return false;
        }

        if (nome) {
            cliente.nome = nome;
        }

        if (email) {
            cliente.email = email;
        }

        if (endereco) {
            cliente.endereco = endereco;
        }

        if (telefone) {
            cliente.telefone = telefone;
        }

        fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2))
        return true;
    }

    deletarCliente(clienteId: string): boolean {
        const clientes = this.leClientes()
        const clienteIndex = clientes.findIndex(c => c.id === clienteId);
        if (clienteIndex === -1) {
            console.error('Cliente não encontrado');
            return false;
        }

        clientes.splice(clienteIndex, 1);
        fs.writeFileSync(this.filePath, JSON.stringify(clientes, null, 2))
        return true;
    }
}
