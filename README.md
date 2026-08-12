# PartnerHub

> Plataforma open-source de gestão de parceiros e indicações. Fair-code: self-host de graça, versão hospedada paga.

**Versão atual:** `v0.1.0` (primeira versão, ~85% do escopo inicial)

---

## O que é

`App pensado para empresas com o foco em registrar seus parceiros afim de poder entender e metrificar essa área`

Basicamente duas frentes:

**ADMIN**
- Dashboard com os parceiros em cards (grid, toggle ativar/desativar)
- CRM Kanban pra controlar a etapa de cada lead indicado: `Indicado > Atendido > Reunião > Proposta > Cliente` (drag and drop)
- Geração de links de referral (pra parceiro indicar outros parceiros, não leads)
- Cadastro de usuários (admin/partner) via modal com abas

**PARTNER**
- Perfil próprio com login, KPIs (indicações, conversões, taxa de conversão, comissionamento, valor recebido, valor pendente)
- Ranking anonimizado entre parceiros (fomenta indicação)

---

## Stack

> Definida por afinidade e domínio, não por hype.

- **Front:** React + TypeScript + Vite
- **Back:** Node + Fastify + TypeScript
- **DB:** PostgreSQL via Supabase (Auth + RLS)

### Por que essa arquitetura

O front **nunca** fala direto com o Supabase. Toda requisição passa pelo backend, que usa a `service_role key` (nunca exposta no navegador). Decisão de segurança: nada de identificador/chave sensível aparecendo em console ou requisição do cliente.

```
Frontend (React) → Backend (Fastify) → Supabase (Postgres + Auth + RLS)
```

---

## Rodando o projeto

### Frontend
```
cd PartnerHub
npm install
npm run dev
```
Cria um `.env` na raiz com:
```
VITE_API_URL=http://localhost:3333
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Backend
```
cd backend
npm install
npm run dev
```
Cria um `.env` (usa o `.env.example` como base):
```
PORT=3333
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
FRONTEND_URL=http://localhost:5173
```

### Banco
As migrations estão em `database/migrations`. Roda direto no SQL Editor do Supabase (ou via CLI, se preferir). Ordem de dependência: `users` → `partners` → `leads` / `referral_links`.

---

## Lógica de construção (pra quem for contribuir)

Ordem seguida em todo o projeto, tanto no front quanto no back — **dados antes de visual**:

```
types → mocks → services → components → pages
```

Os mocks continuam no código de propósito, como exemplo/demonstração da plataforma — não foram apagados na hora de trocar pra API real. Todo `service` segue o mesmo padrão: `getX()` busca, `addX()` cria, sempre `async` retornando `Promise<Tipo>`.

---

## Monetização

Self-host: grátis, sem anúncio, sem limitação. Se usar a instância hospedada oficial (sem trocar as env vars do banco), é assinatura fixa. Verificação de licença acontece só no servidor — nunca confiando em nada que roda no cliente.

---

## Roadmap

- [x] Frontend completo (dashboard, Kanban, perfil, ranking, cadastros)
- [x] Backend Fastify + Supabase real (auth, partners, leads, users, referral_links)
- [x] KPIs calculados de verdade (não mais fixo no mock)
- [ ] Proteção de rota (exigir login)
- [ ] Reativar RLS com políticas corretas
- [ ] Responsividade revisada pós-redesign
- [ ] Configurações
- [ ] API pública pra integração com outros ecossistemas/automações

---

## Contribuindo

Projeto open-source, fair-code. Se for mexer, segue a mesma lógica de construção (dados → services → visual) que o resto do código já usa, pra manter consistência.