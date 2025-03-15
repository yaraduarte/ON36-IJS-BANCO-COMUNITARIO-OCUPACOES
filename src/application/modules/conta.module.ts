import { Module } from '@nestjs/common';
import { ContaService } from '../services/conta.service';
import { ContaController } from '../../infra/controllers/conta.controller';
import { ContaRepository } from '../../infra/repositories/contaRepository';

@Module({
  providers: [ContaService, ContaRepository],
  controllers: [ContaController],
  exports: [ContaService, ContaRepository],
})
export class ContaModule { }
