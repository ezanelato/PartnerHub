import type { FastifyInstance } from "fastify";
import { supabaseAdmin } from "../config/database.js";

export async function authRoutes(app: FastifyInstance) {
    app.post('/auth/login', async (request, reply) => {
        const { email, senha } = request.body as { email: string, senha: string };

        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password: senha,
        });3

        if (error || !data.user) {
            return reply.status(401).send({ message: 'Email ou senha inválidos.'});
        }

        const { data: perfil, error: erroPerfil} = await supabaseAdmin
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single();

        console.log('DEBUG:', JSON.stringify(erroPerfil));
        console.log("PERFIL:", perfil);
        console.log("ERRO:", erroPerfil);
        
        if (erroPerfil || !perfil) {
            return reply.status(404).send({ message: 'Perfil não encontrado.' });
        }

        return reply.send({ role: perfil.role, token: data.session?.access_token });
    });
}