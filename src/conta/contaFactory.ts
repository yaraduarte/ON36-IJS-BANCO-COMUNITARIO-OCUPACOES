import Conta from './conta.model';
import ContaCorrente from '../conta-corrente/conta-corrente.model';
import ContaPoupanca from '../conta-poupanca/conta-poupanca.model';
const tipoContaEnum = require('../Enums/tipoContaEnum');

class ContaFactory {
    static criarConta(tipo: typeof tipoContaEnum, codigo: number, parametro?: number): Conta {
        switch (tipo) {
            case tipoContaEnum.CORRENTE:
                return new ContaCorrente(codigo, parametro || 0);
            case tipoContaEnum.POUPANCA:
                return new ContaPoupanca(codigo, parametro || 0);
            default:
                throw new Error('Tipo de conta desconhecido');
        }
    }
}

export default ContaFactory;
