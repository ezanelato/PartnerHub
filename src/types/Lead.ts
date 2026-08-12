// ============ Estagios do Kanbam ============
export type LeadStage = 'indicado' | 'atendido' | 'reuniao' | 'proposta' | 'cliente';

// ============ Tipagem da interface leads ===========
export interface Lead {
    id: string;
    nome: string;
    stage: LeadStage;
    partnerId: string; // referencia ao parceiro que indicou
}

