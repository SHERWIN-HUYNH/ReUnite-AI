import Footer from "@/components/Homepage/Footer"
import Header from "@/components/Homepage/Header"
import Hero from "@/components/Homepage/Hero";
import { MainSearch } from "@/components/MainSearch";


export default function Home() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-12">
          <MainSearch />
        </div>
      </main>
      <Footer />
    </div>
  );
}
