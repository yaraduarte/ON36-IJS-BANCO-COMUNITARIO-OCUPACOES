"use strict";
class ContaCorrente extends Conta {
    constructor(numero, limiteChequeEspecial, saldo = 0) {
        super(numero, saldo);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }
    depositar(valor) {
        this.saldo += valor;
    }
    sacar(valor) {
        if (valor <= this.saldo + this.limiteChequeEspecial) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }
    transferir(valor, contaDestino) {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }
}
