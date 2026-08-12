// ====== Import ======
import type { User } from "../types/User";

// ====== Funcao para usuários mock ======
export const usersMock: User[] = [
    { id: '1', nome: 'Você (admin)', email: 'admin@partnerhub.app', role: 'admin', ativo: true },
    { id: '2', nome: 'Ana Silva', email: 'ana@exemplo.com', role: 'partner', ativo: true },
    { id: '3', nome: 'Carlos Mendes', email: 'carlos@exemplo.com', role: 'partner', ativo: true },
];