import FooterCTA from "@/components/FooterCTA";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FooterCTA />
    </>
  );
}
