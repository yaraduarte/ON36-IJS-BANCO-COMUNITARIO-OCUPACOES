import Conta from '../conta/conta.model';
import tipoContaEnum from '../../Enums/tipoContaEnum';

class ContaCorrente extends Conta {
    public limiteChequeEspecial: number;

    constructor(
        codigo: number,
        limiteChequeEspecial: number,
        saldo: number = 0
    ) {
        super(codigo, saldo, tipoContaEnum.CORRENTE);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }
}

export default ContaCorrente;
