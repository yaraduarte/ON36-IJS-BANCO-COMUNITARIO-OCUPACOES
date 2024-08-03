import { Controller, Body, Post } from '@nestjs/common';
import { ContaCorrenteService } from './conta-corrente.service';
import ContaCorrente from './conta-corrente.model';

@Controller('conta-corrente')
export class ContaCorrenteController {
    constructor(private readonly ContaCorrenteService: ContaCorrenteService) {}

    @Post('depositar')
    public depositar(@Body('codigoConta') codigoConta:number, @Body('valor') valor: number): ContaCorrente {
        return this.ContaCorrenteService.depositar(codigoConta, valor)
    } 

    @Post('sacar')
    public sacar(@Body('codigoConta') codigoConta:number, @Body('valor') valor: number): Object {
        return this.ContaCorrenteService.sacar(codigoConta, valor)
    }

    @Post('transferir')
    public transferir(@Body('codigoContaOrigem') codigoContaOrigem:number, @Body('valor') valor: number, @Body('codigoContaDestino') codigoContaDestino: number): Object {
        return this.ContaCorrenteService.transferir(codigoContaOrigem, valor, codigoContaDestino)
    }
}
