// ======= import dos dados de partner ==========
import type { Partner } from "../types/Partner";

// ======= Dados Mockados - Usa-se virgula por ser array ======
export const partnersMock: Partner[] = [
    {
        id: '1',
        nome: 'Ezequiel Zanelato',
        ativo: true, // para controlar o toggle ativar/desativar no painel adm
        indicacoes: 24,
        conversoes: 9,
        taxaConversao: 37.5,
        comissionamento: 10,
        valorRecebido: 4200,
        valorPendente: 850,
        cliquesLink: 156,
        leadMaisAvancado: { nome: 'Agencia GO', stage: 'proposta' },
    },
    {
        id: '2',
        nome: 'Usuario Fantasma',
        ativo: false, // para controlar o toggle ativar/desativar no painel adm
        indicacoes: 34,
        conversoes: 17,
        taxaConversao: 50,
        comissionamento: 10,
        valorRecebido: 4200,
        valorPendente: 2940,
        cliquesLink: 156,
        leadMaisAvancado: { nome: 'Stepway', stage: 'atendido' },
    },
    {
        id: '3',
        nome: 'Margarett Kolins',
        ativo: true, // para controlar o toggle ativar/desativar no painel adm
        indicacoes: 24,
        conversoes: 9,
        taxaConversao: 37.5,
        comissionamento: 10,
        valorRecebido: 4200,
        valorPendente: 850,
        cliquesLink: 156,
        leadMaisAvancado: null, // teste do caso de parceiro sem lead
    },
]; 