import { Module } from '@nestjs/common';
import { ContaPoupancaService } from './conta-poupanca.service';
import { ContaPoupancaController } from './conta-poupanca.controller';
import { ContaRepository } from '../conta/contaRepository'; 

@Module({
  providers: [ContaPoupancaService, ContaRepository],
  controllers: [ContaPoupancaController]
})
export class ContaPoupancaModule {}
