// ====== Import ======
import { useState, useEffect } from "react";
import type { ReferralLink } from "../types/ReferralLink";
import type { Partner } from "../types/Partner";
import { getReferral, addLink } from "../services/referralLinkService";
import { getPartners } from "../services/partnerService";
import { ReferralLinksList } from "../components/ReferralLinksList";
import { AdminLinkForm } from "../components/AdminLinkForm";


// ===== Construcão da interface pagina Links ======
export function AdminLinks() {
    const [links, setLinks] = useState<ReferralLink[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        getReferral().then((dados) => setLinks(dados));
        getPartners().then((dados) => setPartners(dados));
    }, []);

// ====== Funcao para captar o cadastro do link de referral ======
function handleCreate(link: ReferralLink) {
    addLink(link);
}

    return (
        <div className="admin-links">
        <h1>Links de indicação</h1>
        <AdminLinkForm  partners={partners} onCreate={handleCreate} />
        <ReferralLinksList links={links} partners={partners} />
      </div>
    );
}