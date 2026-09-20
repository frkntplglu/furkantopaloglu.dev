export function Tag({ children }: { children: string }) {
  return <span className="font-mono text-xs text-muted-foreground">#{children}</span>;
}
