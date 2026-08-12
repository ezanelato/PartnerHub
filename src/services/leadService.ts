// ====== Imports ======
import type { Lead } from "../types/Lead";
import { API_URL } from "../hooks/api"; 

// ====== Async uso dos dados mock ======
export async function getLeads(): Promise<Lead[]>{
    const resposta = await fetch(`${API_URL}/leads`);
    const dados = await resposta.json();

    return dados.map((l: any) => ({
        id: l.id,
        nome: l.nome,
        stage: l.stage,
        partnerId: l.partner_id,
    }));
}

// ====== Form Lead ======
export async function addLead(lead: Lead): Promise<Lead> {
    const { nome, stage, partnerId, ...resto} = lead;
    const resposta = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...resto,
            partner_id: partnerId,
            nome: nome,
            stage: stage,
        }),
    });

    return resposta.json();
}

// ====== Update Kanban ======
export async function updateLeadStage(id: string, stage: string): Promise<Lead> {
    const resposta = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ stage }),
    });
    return resposta.json();
}