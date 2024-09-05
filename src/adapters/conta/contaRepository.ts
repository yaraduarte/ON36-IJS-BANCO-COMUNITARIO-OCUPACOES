import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import Conta from '../../domain/conta/conta.model';

@Injectable()
export class ContaRepository {
    private readonly filePath = path.resolve(__dirname, 'mock/contas.json');

    lerContas(): Conta[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data) as Conta[];
    }

    salvarContas(contas: Conta[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf-8');
    }

    salvarConta(conta: Conta): void {
        const contas = this.lerContas();
        const index = contas.findIndex(c => c.codigo === conta.codigo);
        if (index !== -1) {
            contas[index] = conta;
        } else {
            contas.push(conta);
        }
        this.salvarContas(contas);
    }

    deletarConta(codigo: number): boolean {
        const contas = this.lerContas();
        const index = contas.findIndex(c => c.codigo === codigo);
        if (index !== -1) {
            contas.splice(index, 1);
            this.salvarContas(contas);
            return true;
        }
        return false;
    }
}
