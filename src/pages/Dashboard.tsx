// ====== Import para interface e dados ======
import { useState, useEffect, use } from "react"; // interface (estado e effect)
import type { Partner } from "../types/Partner"; // tipagem para partner
import type { Lead, LeadStage } from "../types/Lead";
import { getLeads } from "../services/leadService";
import { getPartners, updatePartnerStatus } from "../services/partnerService"; // Import de objeto
import { PartnerCard } from "../components/PartnerCard"; // Import de objeto

const etapas: LeadStage[] = ['indicado', 'atendido', 'reuniao', 'proposta', 'cliente']; 

// ====== Construcao para carregamento das infos no Dash ======
export function Dashboard() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        Promise.all([getPartners(), getLeads()]).then(([partnersDados, leadsDados]) => {
            const partnersComLead = partnersDados.map((partner) => {
                const leadsDoPartner = leadsDados.filter((l) => l.partnerId === partner.id);

                const maisAvancado = leadsDoPartner.reduce<Lead | null>((melhor, atual) =>
                    !melhor || etapas.indexOf(atual.stage) > etapas.indexOf(melhor.stage) ? atual : melhor
                , null);

                return {
                    ...partner,
                    leadMaisAvancado: maisAvancado
                        ? { nome: maisAvancado.nome, stage: maisAvancado.stage }
                        : null,
                };
            });

            setPartners(partnersComLead);
            setCarregando(false);
        });
    }, []);

    // ====== Adição da Toogle no Dash para funcionalidade ======
    async function handleToggle(id: string) {
        const partner = partners.find((p) => p.id === id);

        if (!partner) return;
    
        const novoStatus = !partner.ativo;
        await updatePartnerStatus(id, novoStatus);
    
        setPartners((atual) =>
            atual.map((p) => (p.id === id ? { ...p, ativo: novoStatus } : p))
        );
    }

    if (carregando) {
        return <p>Carregando parceiros...</p>
    }

    return (
        <div className="dashboard">
            <h1>Parceiros</h1>
            <div className="dashboard__grid">
                {partners.map((partner) => (
                    <PartnerCard key={partner.id} partner={partner} onToggle={handleToggle} />
                ))}
            </div>
        </div>
    );
}

