import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';

@Module({
  providers: [ContaService],
  controllers: [ContaController]
})
export class ContaModule {}
