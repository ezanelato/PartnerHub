import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ====== Motor do login ======
export function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro('');

        // Após estruturacão do backend trocar o endpoint (URL)
        try {
            const resposta = await fetch('http://localhost:3333/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ email, senha }),
            });

            if (!resposta.ok) {
                setErro('Email ou senha inválidos');
                return;
            }

            const { role } = await resposta.json();
            navigate(role === 'admin' ? '/admin' : '/partner'); // Qual interface ver.
        } catch {
            setErro('Não foi possível conectar ao servidor.');
        }
    }

    return (
        <div className="login-page">
        <div className="login-page__image" />
  
        <div className="login-page__form">
          <h1>Entrar</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {erro && <p className="login-page__erro">{erro}</p>}
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    );
}