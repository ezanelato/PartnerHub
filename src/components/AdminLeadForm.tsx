import React, { use, useState } from "react";
import type { Lead } from "../types/Lead";
import type { Partner } from "../types/Partner";

// ====== Props definidas para o form ======
interface AdminLeadFormProps {
    partners: Partner[];
    onCreate: (lead: Lead) => void;
}

// ====== Definicao do formulário e sua interface ======
export function AdminLeadForm({ partners, onCreate}: AdminLeadFormProps) {
    const [nome, setNome] = useState('');
    const [partnerId, setPartnerId] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const novoLead: Lead = {
            id: crypto.randomUUID(),
            nome,
            stage: 'indicado',
            partnerId,
        };
        onCreate(novoLead);
        setNome('');
        setPartnerId('');
    }
    return (
        <form onSubmit={handleSubmit} className="admin-lead-form">
        <input
          type="text"
          placeholder="Nome do lead"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} required>
          <option value="" disabled>Indicado por</option>
          {partners.map((partner) => (
            <option key={partner.id} value={partner.id}>{partner.nome}</option>
          ))}
        </select>
        <button type="submit">Adicionar lead</button>
      </form>
    );
}

