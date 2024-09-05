import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteRepository } from './clienteRepository';

@Module({
  providers: [ClienteService, ClienteRepository],
  controllers: [ClienteController],
  exports: [ClienteService, ClienteRepository],
})
export class ClienteModule {}
