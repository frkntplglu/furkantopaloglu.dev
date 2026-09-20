export function PageHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-10 space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
