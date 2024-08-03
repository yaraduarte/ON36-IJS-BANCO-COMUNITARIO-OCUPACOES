import ICliente from './iCliente';
import Conta from '../conta/conta.module'; 
class Cliente implements ICliente {
    constructor(
        public nome: string,
        public id: string,
        public endereco: string,
        public telefone: string,
        public email: string,
        public contas: Conta[] = []
    ) {}
}

export default Cliente;
