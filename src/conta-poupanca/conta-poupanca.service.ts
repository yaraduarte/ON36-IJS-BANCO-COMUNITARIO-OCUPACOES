import SaqueResult from 'src/interfaces/saqueResult';
import ContaPoupanca from './conta-poupanca.model';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ContaPoupancaService {
    private readonly filePath = path.resolve('./ContaPoupanca.json')
    private leContas(): ContaPoupanca[] {
        const data = fs.readFileSync(this.filePath, 'utf8')
        return JSON.parse(data) as ContaPoupanca[]
    }
    public depositar(codigoConta: number, valor: number): ContaPoupanca {
        const contasPoupanca = this.leContas()
        const ContaPoupanca = contasPoupanca.find(contas => contas.codigo === Number(codigoConta))

        if(!ContaPoupanca){
            console.log(`Conta de número ${ContaPoupanca} não encontrada`)
        }

        ContaPoupanca.saldo += valor
        return ContaPoupanca
    }

    public sacar(codigoConta: number, valor: number): SaqueResult {
        const contasPoupanca = this.leContas()
        const ContaPoupanca = contasPoupanca.find(contas => contas.codigo === Number(codigoConta))

        if(!ContaPoupanca){
            console.log(`Conta de número ${ContaPoupanca} não encontrada`)
        }

        if (valor <= ContaPoupanca.saldo) {
            ContaPoupanca.saldo -= valor;
            return {
                saqueRealizado: true,
                mensagem: `Novo saldo da conta = R$${ContaPoupanca.saldo}`
            }
        }
        return {
            saqueRealizado: false,
            mensagem: `Não é possível sacar o valor pois o saldo da conta é = R$${ContaPoupanca.saldo}`
        }
    }

    public transferir(codigoContaPoupancaOrigem: number, valor: number, codigoContaDestino: number): Object {
        const saquePossivel: SaqueResult = this.sacar(codigoContaPoupancaOrigem, valor)
        if (saquePossivel.saqueRealizado) {
            this.depositar(codigoContaDestino, valor);
            return {
                tranferenciaRealizada: true,
                mensagem: `Tranferência realizada`
            }
        }
        return {
            tranferenciaRealizada: false,
            mensagem: `Tranferência não realizada`
        }
    }
}
