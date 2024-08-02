import { Injectable } from '@nestjs/common';
import Conta from './conta.model';
import Cliente from '../cliente/cliente.model'
import ContaCorrente from '../conta-corrente/conta-corrente.model'
import ContaPoupanca from '../conta-poupanca/conta-poupanca.model'
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ContaService {
    private readonly filePath = path.resolve('src/conta/contaCorrente.json')

    private leClientes(): Cliente[] {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data) as Cliente[]
    }

    criarConta(clienteId: string, tipo: 'corrente' | 'poupanca', codigo: number, numero: string, limiteChequeEspecial?: number, taxaJuros?: number): Conta | null {
        const clientes = this.leClientes()
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            console.error('Cliente não encontrado');
            return null;
        }
    
        let conta
        if (tipo === 'corrente') {
            conta = new ContaCorrente(numero, limiteChequeEspecial || 0)
        } else {
            conta = new ContaPoupanca(numero, taxaJuros || 0)
        }
    
        cliente.contas.push(conta);
        return conta;
    }

    // deletarConta
    // alterarConta
}
