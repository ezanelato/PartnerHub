import Fastify from 'fastify';
import { env } from './config/env.js';
import { authRoutes } from './routes/auth.routes.js';
import cors from '@fastify/cors';
import { partnerRoutes } from './routes/partner.routes.js';
import { leadsRoutes } from './routes/leads.routes.js';
import { referralRoutes } from './routes/referral_links.routes.js';
import { usersRoutes } from './routes/users.routes.js';

// ====== Uso do fastfy e status ======
const app = Fastify({ logger: true });

app.get('/health', async () => {
    return { status: 'ok' };
});

// ====== CORS ======
await app.register(cors, {
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
});

await app.register(authRoutes);
await app.register(partnerRoutes);
await app.register(leadsRoutes);
await app.register(referralRoutes);
await app.register(usersRoutes);

app.listen({ port: Number(env.PORT) }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});