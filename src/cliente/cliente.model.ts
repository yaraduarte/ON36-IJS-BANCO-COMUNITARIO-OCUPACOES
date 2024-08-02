import ICliente from './iCliente';
import { Conta } from '../conta/conta'; // Supondo que a Conta esteja definida em outro arquivo

class Cliente implements ICliente {
    constructor(
        public nome: string,
        public id: string,
        public endereco: string,
        public telefone: string,
        public contas: Conta[] = []
    ) {}
}

export default Cliente;
