import Footer from "@/components/Footer";
import Header from "@/components/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="max-w-6xl mx-auto w-full px-4">
        <Header />
        <div className="pb-10">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
