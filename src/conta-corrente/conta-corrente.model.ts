import Conta from '../conta/conta.model';

class ContaCorrente extends Conta {
    constructor(
        public codigo: number,
        public limiteChequeEspecial: number,
        public saldo: number = 0
    ) {
        super(codigo, saldo);
    }
}

export default ContaCorrente