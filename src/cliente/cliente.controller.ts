import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
    constructor(public readonly clienteService: ClienteService) {}
    @Get()
    public listarClientes() {
        return this.clienteService.leClientes();
    }

    @Get(':id')
    public buscarCliente(id: string) {
        return this.clienteService.buscarCliente(id);
    }

    @Post()
    public criarCliente(nome: string, id: string, endereco: string, telefone: string, email: string) {
        return this.clienteService.criarCliente(nome, id, endereco, telefone, email);
    }

    @Patch(':id')
    public alterarCliente(id: string, nome?: string, endereco?: string, telefone?: string, email?: string) {
        return this.clienteService.alterarCliente(id, nome, endereco, telefone, email);
    }

    @Delete(':id')
    public deletarCliente(id: string) {
        return this.clienteService.deletarCliente(id);
    }
}
