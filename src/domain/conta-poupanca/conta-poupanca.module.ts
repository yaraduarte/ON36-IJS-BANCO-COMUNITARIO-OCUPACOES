import { Module } from '@nestjs/common';
import { ContaPoupancaService } from './conta-poupanca.service';
import { ContaPoupancaController } from '../../application/conta-poupanca/conta-poupanca.controller';
import { ContaRepository } from '../../adapters/conta/contaRepository';

@Module({
  providers: [ContaPoupancaService, ContaRepository],
  controllers: [ContaPoupancaController]
})
export class ContaPoupancaModule {}
