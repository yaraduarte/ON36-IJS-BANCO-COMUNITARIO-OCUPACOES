import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ContaService } from './conta.service';
import Conta from './conta.model';

@Controller('conta')
export class ContaController {
    constructor(private readonly contaService: ContaService) {}

    @Get()
    public obterContas(): Conta[] {
        return this.contaService.obterContas();
    }

    @Post()
    public criarOuAtualizarConta(@Body() conta: Conta): Conta {
        return this.contaService.criarOuAtualizarConta(conta);
    }

    @Delete(':codigo')
    public deletarConta(@Param('codigo') codigo: number): boolean {
        return this.contaService.deletarConta(codigo);
    }
}
