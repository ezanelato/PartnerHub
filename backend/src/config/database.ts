import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// ====== Ignora RLS e usa acesso ADMIN ======
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);