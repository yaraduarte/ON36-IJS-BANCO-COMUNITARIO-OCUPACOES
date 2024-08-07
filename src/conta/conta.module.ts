import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';

@Module({
  providers: [ContaService],
  controllers: [ContaController]
})
export default class ContaModule {
    codigo: number;
}
