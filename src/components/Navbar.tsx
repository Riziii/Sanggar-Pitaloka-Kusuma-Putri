import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SANGGAR_INFO } from '../data/sanggarData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Jadwal Latihan', id: 'jadwal' },
    { label: 'Galeri Foto', id: 'galeri' },
    { label: 'Testimoni', id: 'testimoni' },
    { label: 'Pendaftaran', id: 'pendaftaran' },
    { label: 'Kontak & Lokasi', id: 'kontak' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E1D6]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('beranda');
          }}
          className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#9A3412]"
        >
          {SANGGAR_INFO.shortName}
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#57534E]">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className="hover:text-[#1C1917] hover:underline underline-offset-8 decoration-[#9A3412] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('pendaftaran')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A3412]"
          >
            Daftar Anggota Baru
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E6E1D6] text-[#1C1917] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6E1D6] bg-[#FAF8F5] px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="py-2 text-sm font-medium text-[#1C1917] hover:text-[#9A3412] border-b border-[#E6E1D6]/60 last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('pendaftaran')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap"
            >
              Daftar Anggota Baru via WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
