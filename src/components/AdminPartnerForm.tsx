import { useState } from "react";
import type { Partner } from "../types/Partner";

// ====== interface com as propriedades ======
interface AdminPartnerFormProps {
    onCreate: (partner: Partner) => void;
}

// ====== Funcao para utiliza os tipos e estado do react ======
export function AdminPartnerForm({onCreate}: AdminPartnerFormProps) {
    const [nome, setNome] = useState('');
    const [comissionamento, setComissionamento] = useState(0);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const novoPartner: Partner = {
            id: crypto.randomUUID(), // gerar o id aleatório
            nome,
            ativo: true,
            indicacoes: 0,
            conversoes: 0,
            taxaConversao: 0,
            comissionamento,
            valorPendente: 0,
            valorRecebido: 0,
            cliquesLink: 0,
            leadMaisAvancado: null,
        };
        onCreate(novoPartner);
        setNome('');
        setComissionamento(0);
    }

    return (
        <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Nome do parceiro"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Comissionamento (%)"
          value={comissionamento}
          onChange={(e) => setComissionamento(Number(e.target.value))}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
    );
}