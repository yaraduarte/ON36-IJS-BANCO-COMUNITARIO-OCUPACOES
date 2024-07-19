"use strict";
class Banco {
    constructor() {
        this.clientes = [];
    }
    adicionarCliente(cliente) {
        this.clientes.push(cliente);
    }
    criarConta(clienteId, tipo, numero, limiteChequeEspecial, taxaJuros) {
        const cliente = this.clientes.find(c => c.id === clienteId);
        if (!cliente) {
            console.error('Cliente não encontrado');
            return null;
        }
        let conta;
        if (tipo === 'corrente') {
            conta = new ContaCorrente(numero, limiteChequeEspecial || 0);
        }
        else {
            conta = new ContaPoupanca(numero, taxaJuros || 0);
        }
        cliente.contas.push(conta);
        return conta;
    }
}
