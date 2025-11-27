import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          <div className="space-y-6">
            <h3 className="font-black text-lg uppercase tracking-widest">Get Help</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li>
                <a href="mailto:chauhankm81@gmail.com" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-lg uppercase tracking-widest">About Sole</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Investors
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-lg uppercase tracking-widest">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-white hover:text-black transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-white hover:text-black transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-white hover:text-black transition">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
             <p>© 2025 Sole, Inc. All Rights Reserved</p>
          </div>
          <div className="flex gap-6">
             <Link href="#" className="hover:text-white">Privacy Policy</Link>
             <Link href="#" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}