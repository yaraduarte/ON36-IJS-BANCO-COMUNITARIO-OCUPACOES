import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from '../../application/cliente/cliente.controller';
import { ClienteRepository } from '../../adapters/cliente/clienteRepository';

@Module({
  providers: [ClienteService, ClienteRepository],
  controllers: [ClienteController],
  exports: [ClienteService, ClienteRepository],
})
export class ClienteModule {}
