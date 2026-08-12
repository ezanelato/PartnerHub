create or replace function incrementar_indicacoes(p_partner_id uuid)
returns void as $$
  update public.partners
  set indicacoes = indicacoes + 1
  where id = p_partner_id;
$$ language sql;