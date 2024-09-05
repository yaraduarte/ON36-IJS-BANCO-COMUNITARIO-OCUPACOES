import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from '../../application/conta/conta.controller';
import { ContaRepository } from '../../adapters/conta/contaRepository';

@Module({
  providers: [ContaService, ContaRepository],
  controllers: [ContaController],
  exports: [ContaService, ContaRepository],
})
export class ContaModule {}
