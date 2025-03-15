import { Module } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { ClienteController } from '../../infra/controllers/cliente.controller';
import { ClienteRepository } from '../../infra/repositories/clienteRepository';

@Module({
  providers: [ClienteService, ClienteRepository],
  controllers: [ClienteController],
  exports: [ClienteService, ClienteRepository],
})
export class ClienteModule { }
