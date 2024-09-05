import { Injectable } from '@nestjs/common';
import ContaPoupanca from './conta-poupanca.model';
import SaqueResult from 'src/interfaces/saqueResult';
import { ContaRepository } from '../conta/contaRepository'; 

@Injectable()
export class ContaPoupancaService {
    constructor(private readonly contaRepository: ContaRepository) {}

    private encontrarConta(codigoConta: number): ContaPoupanca {
        const contas = this.contaRepository.lerContas() as ContaPoupanca[];
        const conta = contas.find(c => c.codigo === codigoConta);
        if (!conta) {
            throw new Error(`Conta de número ${codigoConta} não encontrada`);
        }
        return conta;
    }

    public depositar(codigoConta: number, valor: number): ContaPoupanca {
        const conta = this.encontrarConta(codigoConta);
        conta.saldo += valor;
        this.contaRepository.salvarConta(conta);
        return conta;
    }

    public sacar(codigoConta: number, valor: number): SaqueResult {
        const conta = this.encontrarConta(codigoConta);

        if (valor <= conta.saldo) {
            conta.saldo -= valor;
            this.contaRepository.salvarConta(conta);
            return {
                saqueRealizado: true,
                mensagem: `Novo saldo da conta = R$${conta.saldo}`
            };
        }
        return {
            saqueRealizado: false,
            mensagem: `Não é possível sacar o valor pois o saldo da conta é = R$${conta.saldo}`
        };
    }

    public transferir(codigoContaOrigem: number, valor: number, codigoContaDestino: number): Object {
        const saquePossivel: SaqueResult = this.sacar(codigoContaOrigem, valor);
        if (saquePossivel.saqueRealizado) {
            this.depositar(codigoContaDestino, valor);
            return {
                transferenciaRealizada: true,
                mensagem: `Transferência realizada`
            };
        }
        return {
            transferenciaRealizada: false,
            mensagem: `Transferência não realizada`
        };
    }
}
