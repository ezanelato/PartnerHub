import type { FastifyInstance } from "fastify";
import { supabaseAdmin } from "../config/database.js";

// ====== Criacao dos leads e atualizacao ======
export async function leadsRoutes(app: FastifyInstance) {
    app.get('/leads', async(request, reply) => {
        const { data, error } = await supabaseAdmin.from('leads').select('*');

        if (error) {
            return reply.status(500).send({ message: "Não foi possivel obter informacões dos leads." });

        }

        return reply.send(data);
    });

    app.post('/leads', async(request, reply) => {
        const lead = request.body as Record<string, unknown>;

        const { data, error } = await supabaseAdmin
            .from('leads')
            .insert(lead)
            .select()
            .single();

        if (error) {
            return reply.status(400).send({ message: error.message });
        }
        await supabaseAdmin.rpc('incrementar_indicacoes', { p_partner_id: lead.partner_id });

        return reply.status(201).send(data);
    });

    app.patch('/leads/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { stage } = request.body as { stage: string };

        // Busca o lead antes da alteração
        const { data: leadAtual, error: erroLead } = await supabaseAdmin
            .from('leads')
            .select('stage, partner_id')
            .eq('id', id)
            .single();

        if (erroLead || !leadAtual) {
            return reply.status(404).send({ message: 'Lead não encontrado.' });
        }

        // Atualiza a etapa do lead
        const { data, error } = await supabaseAdmin
            .from('leads')
            .update({ stage })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return reply.status(400).send({ message: error.message });
        }

        // Entrou em "cliente" → soma uma conversão
        if (leadAtual.stage !== 'cliente' && stage === 'cliente') {
            await supabaseAdmin.rpc('registrar_conversao', {
                p_partner_id: leadAtual.partner_id,
            });
        }

        // Saiu de "cliente" → remove uma conversão
        if (leadAtual.stage === 'cliente' && stage !== 'cliente') {
            await supabaseAdmin.rpc('remover_conversao', {
                p_partner_id: leadAtual.partner_id,
            });
        }

        return reply.send(data);
    });
}