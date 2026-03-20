# Popolics Club

Catálogo profissional de rifas de Funkos com Next.js App Router, Tailwind e Supabase.

## Arquitetura

- **Next.js (App Router)** para páginas públicas e administrativas.
- **Supabase Auth** para login admin.
- **Supabase Postgres** para persistir tabela `funkos`.
- **Supabase Storage** para upload e distribuição pública das imagens.
- **RLS + policies** garantindo leitura pública apenas dos disponíveis e CRUD apenas para autenticados.

## Estrutura de pastas

```txt
app/
  (public)/categoria/[slug]/page.tsx
  admin/
    funkos/
      actions.ts
      novo/page.tsx
      [id]/editar/page.tsx
    layout.tsx
    page.tsx
  login/page.tsx
  layout.tsx
components/
  admin/
  public/
lib/
  constants.ts
  types.ts
  utils.ts
  supabase/
supabase/
  schema.sql
```

## Setup rápido

1. Instale dependências:

```bash
npm install
```

2. Configure ambiente:

```bash
cp .env.example .env.local
```

3. Preencha `.env.local` com suas chaves Supabase.

4. Execute o SQL em `supabase/schema.sql` no SQL Editor do Supabase.

5. Crie um usuário admin no **Authentication > Users** (email/senha).

6. Rode local:

```bash
npm run dev
```

## Publicação

### Vercel (recomendado)

- Importar repositório na Vercel.
- Definir variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
- Deploy automático via branch principal.

### Supabase checklist

- Tabela `public.funkos` criada.
- Bucket `funkos` criado e público.
- Policies de tabela e storage aplicadas.
- Usuário admin ativo no Auth.

## Pontos de customização

- Código de acesso WhatsApp: `lib/constants.ts` (`ACCESS_CODE`).
- Número WhatsApp: `lib/constants.ts` (`WHATSAPP_NUMBER`).
- Marca/nome: `lib/constants.ts` (`BRAND_NAME`).
- Categorias e temas visuais: `lib/constants.ts` + `app/globals.css`.

## Observações

- Projeto inicia sem dados (catálogo vazio) e depende do painel admin para cadastro real.
- Área pública mostra apenas itens com status `disponível`.
