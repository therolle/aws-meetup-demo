interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description = "This feature is coming soon.",
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <h1 className="text-2xl font-bold text-text-primary mb-3">{title}</h1>
      <p className="text-text-secondary text-center max-w-md">{description}</p>
    </div>
  );
}
