import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-8 mt-10 text-white bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <p className="text-sm text-center text-gray-600 md:text-base md:text-left">
            © 2025 – {new Date().getFullYear()}{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-red-700 to-red-500 bg-clip-text">
              HotTopicsHub
            </span>
            . All rights reserved.
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center mt-4 space-x-4 md:mt-0">
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/disclaimer" className="hover:underline">
              Disclaimer
            </a>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </nav>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/share/19TihMhz6n/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.instagram.com/govtdeskhub?igsh=MTY0b3F6aTFhM2Ewag=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://x.com/govtdeskhub?t=d5gvC4vb72gVO_skMyRnEw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://youtube.com/@govtdesk_hub?si=VYKrb7eh120FTKz1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
