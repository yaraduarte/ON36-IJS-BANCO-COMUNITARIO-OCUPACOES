import { Module } from '@nestjs/common';
import { ContaCorrenteService } from './conta-corrente.service';
import { ContaCorrenteController } from '../../application/conta-corrente/conta-corrente.controller';
import { ContaRepository } from '../../adapters/conta/contaRepository';

@Module({
  providers: [ContaCorrenteService, ContaRepository],
  controllers: [ContaCorrenteController]
})
export class ContaCorrenteModule {}
