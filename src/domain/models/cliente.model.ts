import ICliente from '../interfaces/iCliente';
import { ContaModule } from '../../application/modules/conta.module';
class Cliente implements ICliente {
  constructor(
    public nome: string,
    public id: string,
    public endereco: string,
    public telefone: string,
    public email: string,
    public contas: ContaModule[] = [],
  ) { }
}

export default Cliente;
