// ====== Import ======
import type { Lead } from "../types/Lead";

// ====== Func com os dados mocados ======
export const leadsMock: Lead[] = [
    { id: '1', nome: 'Empresa XPTO', stage: 'proposta', partnerId: '1' },
    { id: '2', nome: 'Loja Beta', stage: 'reuniao', partnerId: '2' },
    { id: '3', nome: 'Consultoria Alfa', stage: 'indicado', partnerId: '1' },
    { id: '4', nome: 'Mercado Central', stage: 'atendido', partnerId: '2' },
    { id: '5', nome: 'Studio Criativo', stage: 'cliente', partnerId: '1' },
];