/**
 * BadgeLabel component for displaying feature announcement badges
 */
export const BadgeLabel = ({ text }: { text: string }) => {
  return (
    <div
      className="border-border bg-background mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
      role="note"
    >
      <span
        className="bg-primary flex h-2 w-2 rounded-full"
        aria-hidden="true"
      ></span>
      <span className="text-muted-foreground text-xs font-medium">{text}</span>
    </div>
  );
};
