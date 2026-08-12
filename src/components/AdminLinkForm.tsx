import { useState } from "react";
import type { ReferralLink } from "../types/ReferralLink";
import type { Partner } from "../types/Partner";

// ====== interface com as props ======
interface AdminLinkFormProps {
    partners: Partner[];
    onCreate: (link: ReferralLink) => void;
}

// ====== Funcao para criar o formulario na interface ======
export function AdminLinkForm({ partners, onCreate }: AdminLinkFormProps) {
    const [partnerId, setPartnerId] = useState('');
    // func de envio
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const partner = partners.find((p) => p.id === partnerId);
        if (!partner) return;
        // slug para link proprio
        const slug = partner.nome.toLowerCase().replace(/\s+/g, '-');
        const novoLink: ReferralLink = {
            id: crypto.randomUUID(),
            partnerId,
            url: `https://partnerhub.vercel.app/r/${slug}`,
            cliques: 0,
            criadoEm: new Date().toISOString().slice(0, 10),
        };
        onCreate(novoLink);
        setPartnerId('');
    }
    
    return (
        <form onSubmit={handleSubmit} className="admin-form">
        <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} required>
          <option value="" disabled>Selecione um parceiro</option>
          {partners.map((partner) => (
            <option key={partner.id} value={partner.id}>{partner.nome}</option>
          ))}
        </select>
        <button type="submit">Gerar link</button>
      </form>       
    );
}