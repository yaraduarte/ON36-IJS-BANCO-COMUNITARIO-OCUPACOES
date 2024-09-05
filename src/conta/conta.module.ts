import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { ContaRepository } from './contaRepository';

@Module({
  providers: [ContaService, ContaRepository],
  controllers: [ContaController],
  exports: [ContaService, ContaRepository],
})
export class ContaModule {}
