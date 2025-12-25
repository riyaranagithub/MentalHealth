import { Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Download', 'Changelog'],
    Resources: ['Blog', 'Help Center', 'Community', 'Guides'],
    Company: ['About', 'Careers', 'Press', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer']
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl text-purple-600 flex items-center gap-2 mb-4">
              <span className="text-3xl">🧠</span>
              MindMate
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your trusted companion for mental wellness. Track, reflect, and find calm every day.
            </p>
            
            {/* Social icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-purple-100 flex items-center justify-center transition-colors group"
              >
                <Twitter className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-purple-100 flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-purple-100 flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-gray-900 mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 MindMate. All rights reserved.
            </p>
            
            <p className="text-gray-600 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400 fill-current" /> for mental wellness
            </p>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-xs text-gray-600 text-center">
              <strong>Disclaimer:</strong> MindMate is not a substitute for professional mental health care. 
              If you're experiencing a mental health crisis, please contact a mental health professional or crisis hotline immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
