import { Module } from '@nestjs/common';
import { ContaCorrenteService } from './conta-corrente.service';
import { ContaCorrenteController } from './conta-corrente.controller';
import { ContaRepository } from '../conta/contaRepository'; 

@Module({
  providers: [ContaCorrenteService, ContaRepository],
  controllers: [ContaCorrenteController]
})
export class ContaCorrenteModule {}
