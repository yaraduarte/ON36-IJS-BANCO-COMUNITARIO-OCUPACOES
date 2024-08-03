enum tipoContaEnum {
    CORRENTE = 1,
    POUPANCA = 2,
    INVESTIMENTO = 3
}

abstract class Conta {
    constructor(
        public codigo: number = 0,
        public dataCriacao: Date,
        public tipo: tipoContaEnum
    ) {}
}

export default Conta