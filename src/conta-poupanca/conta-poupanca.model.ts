import Conta from '../conta/conta.model';

class ContaPoupanca extends Conta {
    constructor(
        numero: string,
        public taxaJuros: number,
        saldo: number = 0
    ) {
        super(numero, saldo);
    }
}

export default ContaPoupanca