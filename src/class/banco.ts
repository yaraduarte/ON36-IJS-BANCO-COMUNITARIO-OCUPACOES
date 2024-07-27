class Banco {
    private clientes: Cliente[] = [];

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    criarConta(clienteId: string, tipo: 'corrente' | 'poupanca', numero: string, limiteChequeEspecial?: number, taxaJuros?: number): Conta | null {
        const cliente = this.clientes.find(c => c.id === clienteId);
        if (!cliente) {
            console.error('Cliente não encontrado');
            return null;
        }

        let conta: Conta;
        if (tipo === 'corrente') {
            conta = new ContaCorrente(numero, limiteChequeEspecial || 0);
        } else {
            conta = new ContaPoupanca(numero, taxaJuros || 0);
        }

        cliente.contas.push(conta);
        return conta;
    }
}