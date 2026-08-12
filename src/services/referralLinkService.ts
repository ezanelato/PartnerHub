// ====== imports ======
import type { ReferralLink } from "../types/ReferralLink";
import { API_URL } from "../hooks/api";

// ====== Function para receber os dados mock ======
export async function getReferral(): Promise<ReferralLink[]> {
    const resposta = await fetch(`${API_URL}/referral_links`);
    return resposta.json();
}

// ====== funcao para adicionar o dado reais e mock ======
export async function addLink(link: ReferralLink): Promise<ReferralLink> {
    const { partnerId, url, cliques, criadoEm, ...resto } = link;

    const resposta = await fetch(`${API_URL}/referral_links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...resto,
            partner_id: partnerId,
            url: url,
            cliques: cliques,
            created_at: criadoEm, 
        }),
    });

    return resposta.json();
}