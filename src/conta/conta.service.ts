import { Injectable } from '@nestjs/common';
import Conta from './conta.model';
import ContaFactory from './ContaFactory';
import ContaRepository from './contaRepository'; 
import tipoContaEnum from '../Enums/tipoContaEnum';  
import ContaModule from './conta.module'; 
import ContaCorrente from '../conta-corrente/conta-corrente.model'; // Import the ContaCorrente type
import ContaPoupanca from 'src/conta-poupanca/conta-poupanca.model';

@Injectable()
export class ContaService {
    constructor(private readonly contaRepository: ContaRepository) {}

    criarConta(clienteId: string, tipo: tipoContaEnum, codigo: number, parametro?: number): Conta {
        const clientes = this.contaRepository.lerClientes();
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        if (cliente.contas.find(c => c.codigo === codigo)) {
            throw new Error('Conta já existe');
        }

        const novaConta = ContaFactory.criarConta(tipo, codigo, parametro);
        cliente.contas.push(novaConta);
        this.contaRepository.salvarCliente(cliente);
        return novaConta;
    }

    deletarConta(clienteId: string, codigoConta: number): boolean {
        const clientes = this.contaRepository.lerClientes();
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const contaIndex = cliente.contas.findIndex(c => c.codigo === codigoConta);
        if (contaIndex === -1) {
            throw new Error('Conta não encontrada');
        }

        cliente.contas.splice(contaIndex, 1);
        this.contaRepository.salvarCliente(cliente);
        return true;
    }

    alterarConta(clienteId: string, codigoConta: number, limiteChequeEspecial?: number, taxaJuros?: number): boolean {
        const clientes = this.contaRepository.lerClientes();
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const conta = cliente.contas.find(c => c.codigo === codigoConta);
        if (!conta) {
            throw new Error('Conta não encontrada');
        }

        if (conta instanceof ContaCorrente) {
            (conta as ContaCorrente).limiteChequeEspecial = limiteChequeEspecial || 0;
        } else if (conta instanceof ContaPoupanca) {
            (conta as ContaPoupanca).taxaJuros = taxaJuros || 0;
        }

        this.contaRepository.salvarCliente(cliente);
        return true;
    }

    listarContas(): ContaModule[] {
        const clientes = this.contaRepository.lerClientes();
        return clientes.flatMap(c => c.contas);
    }
}
