"use strict";
class ContaPoupanca extends Conta {
    constructor(numero, taxaJuros, saldo = 0) {
        super(numero, saldo);
        this.taxaJuros = taxaJuros;
    }
    depositar(valor) {
        this.saldo += valor;
    }
    sacar(valor) {
        if (valor <= this.saldo) {
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
