import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContaService } from './conta.service';
import Conta from './conta.model';
import Cliente from '../cliente/cliente.model'; 

@Controller('conta')
export class ContaController {
    constructor(private readonly ContaService: ContaService) {}

    @Post(':clienteId/criarConta')
    public criarConta(@Param('clienteId') clienteId: string, @Param('tipo') tipo: 'corrente' | 'poupanca', @Param('codigo') codigo: number, @Param('limiteChequeEspecial') limiteChequeEspecial?: number, @Param('taxaJuros') taxaJuros?: number): Conta | null {
        return this.ContaService.criarConta(clienteId, tipo, codigo, limiteChequeEspecial, taxaJuros);
    }

    @Delete(':clienteId/deletarConta')
    public deletarConta(@Param('clienteId') clienteId: string, @Param('codigoConta') codigoConta: number): boolean {
        return this.ContaService.deletarConta(clienteId, codigoConta);
    }

    @Patch(':clienteId/alterarConta')
    public alterarContaPatch(@Param('clienteId') clienteId: string, @Param('codigoConta') codigoConta: number, @Param('limiteChequeEspecial') limiteChequeEspecial?: number, @Param('taxaJuros') taxaJuros?: number): boolean {
        return this.ContaService.alterarConta(clienteId, codigoConta, limiteChequeEspecial, taxaJuros);
    }

    @Get()
    public listarContas(): Conta[] {
        return this.ContaService.listarContas();
    }

    @Get('/clientes')
    public leClientes(): Cliente[] {
        return this.ContaService.leClientes();
    }
}
