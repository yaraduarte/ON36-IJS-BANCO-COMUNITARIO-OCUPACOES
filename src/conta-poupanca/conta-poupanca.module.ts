import { Module } from '@nestjs/common';
import { ContaPoupancaService } from './conta-poupanca.service';

@Module({
  providers: [ContaPoupancaService]
})
export default class ContaPoupancaModule {}
