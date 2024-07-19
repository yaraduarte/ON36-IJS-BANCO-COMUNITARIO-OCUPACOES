class ContaPoupanca extends Conta {
    constructor(
        numero: string,
        public taxaJuros: number,
        saldo: number = 0
    ) {
        super(numero, saldo);
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    sacar(valor: number): boolean {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }

    transferir(valor: number, contaDestino: Conta): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }
}