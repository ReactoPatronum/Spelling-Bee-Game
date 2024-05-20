import Header from "@/components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <div className="max-w-3xl mx-auto">{children}</div>
    </section>
  );
}
