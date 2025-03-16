import { Injectable } from '@nestjs/common';
import Conta from '../../domain/models/conta.model';
import { ContaRepository } from '../../infra/repositories/contaRepository';

@Injectable()
export class ContaService {
  constructor(private readonly contaRepository: ContaRepository) { }

  obterContas(): Conta[] {
    return this.contaRepository.lerContas();
  }

  criarOuAtualizarConta(conta: Conta): Conta {
    this.contaRepository.salvarConta(conta);
    return conta;
  }

  deletarConta(codigo: number): boolean {
    return this.contaRepository.deletarConta(codigo);
  }
}
