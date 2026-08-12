create table public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  stage text not null check (stage in ('indicado', 'atendido', 'reuniao', 'proposta', 'cliente')) default 'indicado',
  partner_id uuid not null references public.partners(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Parceiro lê os próprios leads"
  on public.leads for select
  using (partner_id = auth.uid());

create policy "Admin lê e gerencia todos os leads"
  on public.leads for all
  using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );