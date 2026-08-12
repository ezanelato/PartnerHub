// ====== Import ======
import type { User } from "../types/User";
import { API_URL } from "../hooks/api";

// ====== Func async para fetch futuro ======
export async function getUsers(): Promise<User[]> {
    const resposta = await fetch(`${API_URL}/users`);
    return resposta.json();
}

// ====== Recebe os dados do onCreate da UserForm ======
export async function addUser (user: User): Promise<User> {
    const { nome, email, senha, role, fotoBase64, ativo, ...resto } = user;
    const resposta = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...resto,
            nome: nome,
            email: email,
            senha: senha,
            role: role,
            foto_base64: fotoBase64,
            ativo: ativo,
        }),
    });

    return resposta.json();
}