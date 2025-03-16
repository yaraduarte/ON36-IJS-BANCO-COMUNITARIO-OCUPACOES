import Conta from '../../domain/models/conta.model';
import tipoContaEnum from '../../domain/valueObjects/tipoContaEnum';

class ContaFactory {
  static criarConta(
    tipo: tipoContaEnum,
    codigo: number,
    parametro?: number,
  ): Conta {
    const parametroValido =
      parametro !== undefined && !isNaN(parametro) ? parametro : 0;

    switch (tipo) {
      case tipoContaEnum.CORRENTE:

        class ContaCorrente extends Conta {
          constructor(public codigo: number, public parametro: number) {
            super(codigo, parametro, 'CORRENTE');
          }
        } new ContaCorrente(codigo, parametroValido);
      case tipoContaEnum.POUPANCA:
        class ContaPoupanca extends Conta {
          constructor(public codigo: number, public parametro: number) {
            super(codigo, parametro, 'POUPANCA');
          }
        }
        return new ContaPoupanca(codigo, parametroValido);
      default:
        throw new Error('Tipo de conta desconhecido');
    }
  }
}

export default ContaFactory;
