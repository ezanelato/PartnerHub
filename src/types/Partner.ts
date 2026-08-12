// ====== Import dados criados ======
import type { Lead } from "./Lead";

// ======= Tipagem dos elementos para partners ======
export interface Partner {
    id: string;
    nome: string;
    ativo: boolean; // para controlar o toggle ativar/desativar no painel adm
    indicacoes: number;
    conversoes: number;
    taxaConversao: number;
    comissionamento: number;
    valorRecebido: number;
    valorPendente: number;
    cliquesLink: number;
    leadMaisAvancado: Pick<Lead, 'nome' | 'stage'> | null; //null parceiro sem lead

}