// ======== Tipagem ranking (Partners indicadores) =======
export interface RankingEntry {
    posicao: number;
    label: string; //tipo para definir o anonimato só exibe o real nome caso seja do próprio user.
    valorReferencia: number; 
    souEu: boolean;
}