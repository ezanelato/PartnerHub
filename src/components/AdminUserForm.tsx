import { useState } from "react";
import type { User, UserRole } from "../types/User";
import type { Partner } from "../types/Partner";

interface AdminUserFormProps {
  onCreate: (user: User, partner: Partner | null) => void;
}

export function AdminUserForm({ onCreate }: AdminUserFormProps) {
  const [role, setRole] = useState<UserRole>("partner");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [comissionamento, setComissionamento] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const novoUser: User = {
      id,
      nome,
      email,
      role,
      senha,
      ativo: true,
    };

    const novoPartner: Partner | null =
      role === "partner"
        ? {
            id,
            nome,
            ativo: true,
            indicacoes: 0,
            conversoes: 0,
            taxaConversao: 0,
            comissionamento,
            valorRecebido: 0,
            valorPendente: 0,
            cliquesLink: 0,
            leadMaisAvancado: null,
          }
        : null;

    onCreate(novoUser, novoPartner);

    setNome("");
    setEmail("");
    setSenha("");
    setComissionamento(0);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="role-selector">
        <button
          type="button"
          className={role === "admin" ? "role-card active" : "role-card"}
          onClick={() => setRole("admin")}
        >
          <div className="role-icon">A</div>

          <div>
            <strong>Administrador</strong>
            <span>Acesso administrativo</span>
          </div>
        </button>

        <button
          type="button"
          className={
            role === "partner" ? "role-card active" : "role-card"
          }
          onClick={() => setRole("partner")}
        >
          <div className="role-icon">P</div>

          <div>
            <strong>Partner</strong>
            <span>Usuário parceiro</span>
          </div>
        </button>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="nome">Nome completo</label>

          <input
            id="nome"
            type="text"
            placeholder="Ex: João da Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">E-mail</label>

          <input
            id="email"
            type="email"
            placeholder="joao@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="senha">Senha provisória</label>

          <input
            id="senha"
            type="password"
            placeholder="Digite uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {role === "partner" && (
          <div className="form-field">
            <label htmlFor="comissionamento">
              Comissionamento
            </label>

            <div className="input-with-suffix">
              <input
                id="comissionamento"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={comissionamento}
                onChange={(e) =>
                  setComissionamento(Number(e.target.value))
                }
                required
              />

              <span>%</span>
            </div>
          </div>
        )}
      </div>

      <div className="form-footer">
        <button type="submit" className="btn-submit">
          Criar usuário
        </button>
      </div>
    </form>
  );
}