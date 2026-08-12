import type { FastifyInstance } from "fastify";
import { supabaseAdmin } from "../config/database.js";

export async function referralRoutes(app: FastifyInstance) {
    app.get('/referral_links', async(request, reply) => {
        const {data, error} = await supabaseAdmin.from('referral_links').select('*');
        
        if (error) {
            return reply.status(500).send({ message: "Não foi possivel obter o referral link."});

        }
        return reply.status(201).send(data);
    });

    app.post('/referral_links', async(request, reply) => {
        const referrallink = request.body as Record<string, unknown>;

        const {data, error} = await supabaseAdmin
            .from('referral_links')
            .insert(referrallink)
            .select()
            .single();

        if (error) {
            return reply.status(400).send({ message: error.message });
        }
        return reply.send(data);
    });
}