import { Injectable } from '@nestjs/common';
import Conta from './conta.model';
import Cliente from '../cliente/cliente.model'
import ContaCorrente from '../conta-corrente/conta-corrente.model'
import ContaPoupanca from '../conta-poupanca/conta-poupanca.model'
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ContaService {
    private readonly filePath = path.resolve('src/cliente/cliente.json')

    leClientes(): Cliente[] {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data) as Cliente[]
    }

    criarConta(clienteId: string, tipo: 'corrente' | 'poupanca', codigo: number, limiteChequeEspecial?: number, taxaJuros?: number): ContaCorrente | ContaPoupanca {
        const clientes = this.leClientes()
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            console.error('Cliente não encontrado');
            return null;
        }
    
        if (cliente.contas.find(c => c['codigo'] === codigo)) {
            console.error('Conta já existe');
            return null;
        }

        const dataCriacao =  new Date()
    
        if (tipo === 'corrente') {
            cliente.contas.push(new ContaCorrente(codigo, limiteChequeEspecial || 0));
        } else {
            cliente.contas.push(new ContaPoupanca(codigo, taxaJuros || 0));
        }

        return cliente.contas[cliente.contas.length - 1] as ContaCorrente | ContaPoupanca;
    }

    deletarConta(clienteId: string, codigoConta: number): boolean {
        const clientes = this.leClientes()
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            console.error('Cliente não encontrado');
            return false;
        }
    
        const contaIndex = cliente.contas.findIndex(c => c['codigo'] === codigoConta);
        if (contaIndex === -1) {
            console.error('Conta não encontrada');
            return false;
        }
    
        cliente.contas.splice(contaIndex, 1);
        return true;
    }

    alterarConta(clienteId: string, codigoConta: number, limiteChequeEspecial?: number, taxaJuros?: number): boolean {
        const clientes = this.leClientes()
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            console.error('Cliente não encontrado');
            return false;
        }
    
        const conta = cliente.contas.find(c => c['codigo'] === codigoConta);
        if (!conta) {
            console.error('Conta não encontrada');
            return false;
        }
    
        if (conta instanceof ContaCorrente) {
            conta.limiteChequeEspecial = limiteChequeEspecial || 0;
        } else {
            conta['taxaJuros'] = taxaJuros || 0;
        }
    
        return true;
    }

    listarContas(): Conta[] {
        const clientes = this.leClientes()
        const contas: Conta[] = []
        clientes.forEach(c => {
            contas.push(...(c.contas as Conta[]))
        })
        return contas
    }
}
