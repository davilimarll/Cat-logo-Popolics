export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <section className="panel py-14 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm text-brand-muted">{description}</p>
    </section>
  );
}
