import 'dotenv/config';
import { z } from 'zod';

// ====== props e tipo para a ENV ======
const schema = z.object({
    PORT: z.string().default('3333'),
    FRONTEND_URL: z.string().url(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

export const env = schema.parse(process.env);
