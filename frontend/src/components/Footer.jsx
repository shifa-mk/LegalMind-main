import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

/**
 * Footer: Responsive footer component for the LegalMind application.
 * Includes navigation links, contact information, and a necessary disclaimer.
 * Uses Tailwind CSS for modern styling.
 */
export default function Footer() {

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ask AI", path: "/ask" },
    { name: "Sections", path: "/sections" },
    { name: "Admin", path: "/admin" },
  ];

  const legalItems = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 mt-12 pt-10 pb-6 border-t-4 border-indigo-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Logo and Mission */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-3xl font-extrabold text-white">
              Legal<span className="text-indigo-400">Mind</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Empowering law enforcement and citizens with instant, accurate access to legal codes and case information. Knowledge is the first step toward justice.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              &copy; {new Date().getFullYear()} LegalMind Assist. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-indigo-500 pb-1">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm hover:text-indigo-400 transition duration-150">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-indigo-500 pb-1">Support & Legal</h4>
            <ul className="space-y-2">
              {legalItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm hover:text-indigo-400 transition duration-150">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="flex items-center space-x-2 pt-2">
                <Mail size={16} className="text-indigo-400" />
                <a href="mailto:support@legalmind.com" className="text-sm hover:text-indigo-400">support@legalmind.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-indigo-400" />
                <a href="tel:+1234567890" className="text-sm hover:text-indigo-400">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <p className="text-xs text-center text-gray-500 italic px-4">
            *DISCLAIMER: LegalMind Assist is an AI-powered tool for informational purposes only and does not constitute legal advice. Users should always consult with a qualified legal professional for advice concerning specific legal issues.*
          </p>
        </div>

      </div>
    </footer>
  );
}
