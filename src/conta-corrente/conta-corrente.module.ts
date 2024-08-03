import { Module } from '@nestjs/common';
import { ContaCorrenteService } from './conta-corrente.service';
import { ContaCorrenteController } from './conta-corrente.controller';

@Module({
  providers: [ContaCorrenteService],
  controllers: [ContaCorrenteController]
})
export default class ContaCorrenteModule {}
