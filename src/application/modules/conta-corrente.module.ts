import { Module } from '@nestjs/common';
import { ContaCorrenteService } from '../services/conta-corrente.service';
import { ContaCorrenteController } from '../../infra/controllers/conta-corrente.controller';
import { ContaRepository } from '../../infra/repositories/contaRepository';

@Module({
  providers: [ContaCorrenteService, ContaRepository],
  controllers: [ContaCorrenteController],
})
export class ContaCorrenteModule { }
