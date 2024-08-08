const tipoContaEnum = require('../Enums/tipoContaEnum');

abstract class Conta {
    constructor(
        public codigo: number,
        public saldo: number = 0,
        public tipo: typeof tipoContaEnum
    ) {}
}

export default Conta;
