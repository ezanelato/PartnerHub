import type { FastifyInstance } from "fastify";
import { supabaseAdmin } from "../config/database.js";

export async function usersRoutes(app: FastifyInstance) {
    app.get('/users', async(request, reply) => {
        const {data, error} = await supabaseAdmin.from('users').select('*');
        
        if (error) {
            return reply.status(500).send({ message: "Não foi possivel obter dados de usuário."});

        }
        return reply.send(data);
    });

    app.post('/users', async(request, reply) => {
        const body = request.body as {
            nome: string;
            email: string;
            senha: string;
            role: string;
            ativo: boolean;
            foto_base64?: string;
          };

        const { data: authUser, error: authError } =
            await supabaseAdmin.auth.admin.createUser({
                email: body.email,
                password: body.senha,
                email_confirm: true,
            });
        if (authError) {
            return reply.status(400).send({ message: authError.message });
        }

        const {data, error} = await supabaseAdmin
            .from('users')
            .insert({
                id: authUser.user.id,
                nome: body.nome,
                email: body.email,
                role: body.role,
                ativo: body.ativo,
                foto_base64: body.foto_base64,
              })
            .select()
            .single();

        if (error) {
            return reply.status(400).send({ message: error.message });
        }
        return reply.status(201).send(data);
    });
}