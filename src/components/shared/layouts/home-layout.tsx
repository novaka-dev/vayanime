export default function HomeLayout({
  children,
  heading,
  italic,
}: {
  children: React.ReactNode;
  heading?: string;
  italic?: string;
}) {
  return (
    <>
      {heading && (
        <h2 className="text-3xl font-semibold capitalize text-primary">
          {heading} <i>{italic}</i>
        </h2>
      )}
      <div>{children}</div>
    </>
  );
}
