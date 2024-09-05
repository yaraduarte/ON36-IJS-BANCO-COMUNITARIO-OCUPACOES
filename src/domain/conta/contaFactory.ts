import Conta from './conta.model';
import ContaCorrente from '../conta-corrente/conta-corrente.model';
import ContaPoupanca from '../conta-poupanca/conta-poupanca.model';
import tipoContaEnum from '../../Enums/tipoContaEnum';

class ContaFactory {
    static criarConta(tipo: tipoContaEnum, codigo: number, parametro?: number): Conta {
        const parametroValido = parametro !== undefined && !isNaN(parametro) ? parametro : 0;

        switch (tipo) {
            case tipoContaEnum.CORRENTE:
                return new ContaCorrente(codigo, parametroValido);
            case tipoContaEnum.POUPANCA:
                return new ContaPoupanca(codigo, parametroValido);
            default:
                throw new Error('Tipo de conta desconhecido');
        }
    }
}

export default ContaFactory;
