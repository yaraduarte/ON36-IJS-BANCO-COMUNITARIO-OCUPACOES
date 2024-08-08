import Conta from './conta.model';
import Cliente from '../cliente/cliente.model';

interface ContaRepository {
    lerClientes(): Cliente[];
    salvarCliente(cliente: Cliente): void;
    lerContas(): Conta[];
    salvarConta(conta: Conta): void;
}

export default ContaRepository;
