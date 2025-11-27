import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      
      <img
        src="https://github.com/kcdoescode/store-images/blob/main/photo-1552346154-21d32810aba3.png?raw=true"
        alt="New Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl space-y-6">
          
          <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full mb-2">
            New Drops
          </span>

          <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight drop-shadow-sm">
            Step Into <br /> The Future
          </h2>

          <p className="text-white/90 text-lg md:text-xl font-medium max-w-md">
            Experience the next evolution of comfort and style. The Summer Collection is finally here.
          </p>

          <div className="pt-4">
            <Link 
              href="/?q=new"
              className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-base font-bold transition hover:bg-gray-100 active:scale-[0.98]"
            >
              Shop Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}