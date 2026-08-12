create table public.referral_links (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners(id) on delete cascade,
  url text not null,
  cliques integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.referral_links enable row level security;

create policy "Parceiro lê os próprios links"
  on public.referral_links for select
  using (partner_id = auth.uid());

create policy "Admin gerencia todos os links"
  on public.referral_links for all
  using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );