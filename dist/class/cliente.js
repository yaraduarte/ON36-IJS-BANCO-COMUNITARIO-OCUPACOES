"use strict";
class Cliente {
    constructor(nome, id, endereco, telefone, contas = []) {
        this.nome = nome;
        this.id = id;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
    }
}
