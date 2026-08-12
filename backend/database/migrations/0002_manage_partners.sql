create table public.partners (
  id uuid primary key references public.users(id) on delete cascade,
  nome text not null,
  ativo boolean not null default true,
  indicacoes integer not null default 0,
  conversoes integer not null default 0,
  taxa_conversao numeric(5,2) not null default 0,
  comissionamento numeric(5,2) not null default 0,
  valor_recebido numeric(12,2) not null default 0,
  valor_pendente numeric(12,2) not null default 0,
  cliques_link integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.partners enable row level security;

create policy "Parceiro lê o próprio registro"
  on public.partners for select
  using (auth.uid() = id);

create policy "Admin lê todos os parceiros"
  on public.partners for select
  using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

create policy "Admin insere e atualiza parceiros"
  on public.partners for all
  using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );