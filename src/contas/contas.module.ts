import { Module } from '@nestjs/common';
import { ContasController } from './contas.controller';

@Module({
  controllers: [ContasController]
})
export class ContasModule {}
