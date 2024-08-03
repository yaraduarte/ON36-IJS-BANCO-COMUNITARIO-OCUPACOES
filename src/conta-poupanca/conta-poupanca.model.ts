import Conta from '../conta/conta.model';

class ContaPoupanca extends Conta {
    constructor(
        public codigo: number,
        public taxaJuros: number,
        public saldo: number = 0
    ) {
        super(codigo, saldo);
    }
}

export default ContaPoupanca