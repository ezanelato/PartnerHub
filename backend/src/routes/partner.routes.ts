import type { FastifyInstance } from "fastify";
import { supabaseAdmin } from "../config/database.js";

export async function partnerRoutes(app: FastifyInstance) {
    app.get('/partners', async(request, reply) => { 
        const { data, error } = await supabaseAdmin.from('partners').select('*');

        if (error) {
            return reply.status(500).send({ message: 'Erro ao buscar parceiros.'});
        }

        return reply.send(data);
    }); 

    app.post('/partners', async (request, reply) => {
        const partner = request.body as Record<string, any>;
        const indicacoes = Number(partner.indicacoes ?? 0);
        const conversoes = Number(partner.conversoes ?? 0);

        const taxaConversao = indicacoes > 0
            ? (conversoes / indicacoes) * 100 : 0;

        const {data, error} = await supabaseAdmin
            .from('partners')
            .insert({
                ...partner,
                taxa_conversao: taxaConversao,
            })
            .select()
            .single();

        if (error) {
            return reply.status(400).send({ message: error.message });
        }
    
    return reply.status(201).send(data);    
    });

    app.patch('/partners/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { ativo } = request.body as { ativo: boolean};

        const { data, error } = await supabaseAdmin
            .from('partners')
            .update({ ativo })
            .eq('id', id)
            .select()
            .single();
        
        if (error) {
            return reply.status(400).send({ message: error.message });
        }

    return reply.send(data);     
    });
}