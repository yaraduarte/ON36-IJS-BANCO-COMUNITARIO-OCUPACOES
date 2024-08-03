import { Controller, Post, Body } from '@nestjs/common';
import ContaPoupanca from './conta-poupanca.model';
import { ContaPoupancaService } from './conta-poupanca.service';

@Controller('conta-poupanca')
export class ContaPoupancaController {
    constructor(private readonly ContaPoupancaService: ContaPoupancaService) {}

   @Post('depositar')
    public depositar(@Body('codigoConta') codigoConta:number, @Body('valor') valor: number): ContaPoupanca {
        return this.ContaPoupancaService.depositar(codigoConta, valor)
    } 

    @Post('sacar')
    public sacar(@Body('codigoConta') codigoConta:number, @Body('valor') valor: number): Object {
        return this.ContaPoupancaService.sacar(codigoConta, valor)
    }

    @Post('transferir')
    public transferir(@Body('codigoContaOrigem') codigoContaOrigem:number, @Body('valor') valor: number, @Body('codigoContaDestino') codigoContaDestino: number): Object {
        return this.ContaPoupancaService.transferir(codigoContaOrigem, valor, codigoContaDestino)
    }
}
