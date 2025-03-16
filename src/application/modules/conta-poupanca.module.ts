import { Module } from '@nestjs/common';
import { ContaPoupancaService } from '../services/conta-poupanca.service';
import { ContaPoupancaController } from '../../infra/controllers/conta-poupanca.controller';
import { ContaRepository } from '../../infra/repositories/contaRepository';

@Module({
  providers: [ContaPoupancaService, ContaRepository],
  controllers: [ContaPoupancaController],
})
export class ContaPoupancaModule { }
