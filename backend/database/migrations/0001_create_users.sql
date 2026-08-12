create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  role text not null check (role in ('admin', 'partner')),
  ativo boolean not null default true,
  foto_base64 text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Usuário lê o próprio perfil"
  on public.users for select
  using (auth.uid() = id);

create policy "Usuário edita o próprio perfil"
  on public.users for update
  using (auth.uid() = id);

create policy "Admin lê todos os perfis"
  on public.users for select
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );