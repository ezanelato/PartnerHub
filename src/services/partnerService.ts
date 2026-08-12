// ====== Importacao dos dados gerais para Partner ======
import type { Partner } from "../types/Partner"; //tipagem
import { API_URL } from "../hooks/api"; //dados

// ===== Recebe dos dados mock com tipagem definida =====
export async function getPartners(): Promise<Partner[]> {
    const resposta = await fetch(`${API_URL}/partners`);
    const dados = await resposta.json();

    return dados.map((partner: any) => ({
        id: partner.id,
        nome: partner.nome,
        ativo: partner.ativo,
        indicacoes: partner.indicacoes,
        conversoes: partner.conversoes,
        taxaConversao: partner.taxa_conversao,
        comissionamento: partner.comissionamento,
        valorRecebido: partner.valor_recebido,
        valorPendente: partner.valor_pendente,
        cliquesLink: partner.cliques_link,
        leadMaisAvancado: null,
    }));
}
// ====== Recebe os dados do onCreate da UserForm ======
export async function addPartner(partner: Partner): Promise<Partner> {
    const { leadMaisAvancado, taxaConversao, ...partners } = partner;
  
    const resposta = await fetch(`${API_URL}/partners`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: partners.id,
        nome: partners.nome,
        ativo: partners.ativo,
        indicacoes: partners.indicacoes ?? 0,
        conversoes: partners.conversoes ?? 0,
        comissionamento: partners.comissionamento ?? 0,
        valor_recebido: partners.valorRecebido ?? 0,
        valor_pendente: partners.valorPendente ?? 0,
        cliques_link: partners.cliquesLink ?? 0,
      }),
    });
  
    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || "Erro ao criar partner");
    }
  
    return resposta.json();
  }

// ====== Update toggle no db ======
export async function updatePartnerStatus(id: string, ativo: boolean): Promise<Partner> {
    const resposta = await fetch(`${API_URL}/partners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ativo }),
    });
    
    return resposta.json()
}
