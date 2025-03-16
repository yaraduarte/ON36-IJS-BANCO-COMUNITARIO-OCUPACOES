import Conta from './conta.model';
import tipoContaEnum from '../valueObjects/tipoContaEnum';

class ContaPoupanca extends Conta {
  public taxaJuros: number;

  constructor(codigo: number, taxaJuros: number, saldo: number = 0) {
    super(codigo, saldo, tipoContaEnum.POUPANCA);
    this.taxaJuros = taxaJuros;
  }
}

export default ContaPoupanca;
