abstract class Conta {
    constructor(
        public numero: string,
        public saldo: number = 0
    ) {}

    abstract depositar(valor: number): void;
    abstract sacar(valor: number): boolean;
    abstract transferir(valor: number, contaDestino: Conta): boolean;
}