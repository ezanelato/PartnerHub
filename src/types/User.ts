// ====== Definicão de Role por user ======
export type UserRole = 'admin' | 'partner';

// ====== Export dos tipos primitivos ======
export interface User {
    id: string;
    nome: string;
    email: string;
    senha: string;
    role: UserRole;
    ativo: boolean;
    fotoBase64?: string;
}