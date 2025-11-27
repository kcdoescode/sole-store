import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      
      <AnnouncementBar />
      <Navbar />

      <div className="flex-1">
        
        <div className="relative bg-gray-100 py-24 px-6 sm:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            We Are Sole.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Redefining sneaker culture through quality, innovation, and style.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with a simple mission: to provide the most exclusive and high-quality footwear to enthusiasts around the world. 
              Sole started as a small passion project and has grown into a premier destination for sneakerheads. 
              We believe that every step matters, and the right pair of shoes can change your entire journey.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We are committed to authenticity and excellence. Every product we sell is verified and curated to ensure 
              you get nothing but the best. Whether you are looking for the latest drops or timeless classics, 
              Sole is your trusted partner in style.
            </p>
          </section>

          <section className="bg-black text-white p-8 md:p-12 rounded-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Have a question about an order, sizing, or just want to say hello? Our support team is ready to assist you.
            </p>
            
            <a 
              href="mailto:chauhankm81@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
            <p className="mt-4 text-xs text-gray-500">
              Direct Email: chauhankm81@gmail.com
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}