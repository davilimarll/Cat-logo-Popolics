-- Enable extension for UUID generation
create extension if not exists "pgcrypto";

create table if not exists public.funkos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text unique,
  categoria text not null check (categoria in ('dothraki', 'dracarys', 'iron-throne')),
  descricao text,
  image_url text,
  status text not null default 'disponível' check (status in ('disponível', 'reservado', 'escolhido', 'indisponível')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_funkos_categoria on public.funkos (categoria);
create index if not exists idx_funkos_status on public.funkos (status);
create index if not exists idx_funkos_nome on public.funkos using gin (to_tsvector('simple', nome));

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_funkos_updated_at
before update on public.funkos
for each row execute procedure public.set_updated_at();

alter table public.funkos enable row level security;

-- Público só enxerga itens disponíveis.
create policy "public can read available funkos"
on public.funkos
for select
using (status = 'disponível');

-- Admin autenticado pode ler tudo e gerenciar CRUD.
create policy "authenticated can read all funkos"
on public.funkos
for select to authenticated
using (true);

create policy "authenticated can insert funkos"
on public.funkos
for insert to authenticated
with check (true);

create policy "authenticated can update funkos"
on public.funkos
for update to authenticated
using (true)
with check (true);

create policy "authenticated can delete funkos"
on public.funkos
for delete to authenticated
using (true);

-- Storage: bucket de imagens
insert into storage.buckets (id, name, public)
values ('funkos', 'funkos', true)
on conflict (id) do nothing;

-- Público pode ver imagens.
create policy "public can read funko images"
on storage.objects
for select
using (bucket_id = 'funkos');

-- Apenas autenticados podem enviar/alterar/remover imagens.
create policy "authenticated can upload funko images"
on storage.objects
for insert to authenticated
with check (bucket_id = 'funkos');

create policy "authenticated can update funko images"
on storage.objects
for update to authenticated
using (bucket_id = 'funkos')
with check (bucket_id = 'funkos');

create policy "authenticated can delete funko images"
on storage.objects
for delete to authenticated
using (bucket_id = 'funkos');
