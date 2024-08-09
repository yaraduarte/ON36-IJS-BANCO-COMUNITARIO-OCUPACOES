import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import Cliente from './cliente.model';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Get()
    public obterClientes(): Cliente[] {
        return this.clienteService.obterClientes();
    }

    @Post()
    public criarOuAtualizarCliente(@Body() cliente: Cliente): Cliente {
        return this.clienteService.criarOuAtualizarCliente(cliente);
    }

    @Delete(':id')
    public deletarCliente(@Param('id') id: string): boolean {
        return this.clienteService.deletarCliente(id);
    }
}
