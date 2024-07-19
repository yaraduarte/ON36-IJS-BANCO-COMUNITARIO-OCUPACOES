class Cliente implements ICliente {
    constructor(
        public nome: string,
        public id: string,
        public endereco: string,
        public telefone: string,
        public contas: Conta[] = []
    ) {}
}