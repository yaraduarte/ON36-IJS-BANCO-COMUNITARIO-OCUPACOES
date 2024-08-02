import Conta from '../conta/conta.model';

class ContaCorrente extends Conta {
    constructor(
        numero: string,
        public limiteChequeEspecial: number,
        saldo: number = 0
    ) {
        super(numero, saldo);
    }
}

export default ContaCorrente