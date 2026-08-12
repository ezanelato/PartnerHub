create or replace function registrar_conversao(p_partner_id uuid)
returns void as $$
  update public.partners
  set conversoes = conversoes + 1,
      taxa_conversao = round((conversoes + 1)::numeric / nullif(indicacoes, 0) * 100, 2)
  where id = p_partner_id;
$$ language sql;