import React, { useState } from 'react';
import { Menu, Monitor, Smartphone, Tablet, X } from 'lucide-react';
import { ViewportPreference, useViewport } from '../context/ViewportContext';
import { SANGGAR_INFO } from '../data/sanggarData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { preference, setPreference, effectiveMode, detectedDevice } = useViewport();

  const isMobile = effectiveMode === 'mobile';
  const isTablet = effectiveMode === 'tablet';

  const navItems = [
    { label: 'Jadwal Latihan', id: 'jadwal' },
    { label: 'Galeri Foto', id: 'galeri' },
    { label: 'Testimoni', id: 'testimoni' },
    { label: 'Pendaftaran', id: 'pendaftaran' },
    { label: 'Kontak & Lokasi', id: 'kontak' },
  ];

  const modeOptions: { id: ViewportPreference; label: string; icon?: React.ReactNode }[] = [
    { id: 'auto', label: `Otomatis (${detectedDevice === 'mobile' ? 'HP' : detectedDevice === 'tablet' ? 'Tablet' : 'Desktop'})` },
    { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: 'tablet', label: 'Tablet', icon: <Tablet className="w-3.5 h-3.5" /> },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E1D6]">
      {/* Synchronized Viewport Mode Bar (Desktop / Tablet / Mobile) */}
      <div className="bg-[#F2EFE9] border-b border-[#E6E1D6]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="text-[11px] text-[#57534E] whitespace-nowrap flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A3412]" />
            <span>
              Sinkronisasi Tampilan:{' '}
              <strong className="text-[#1C1917] uppercase">{effectiveMode}</strong>
            </span>
          </div>

          <div
            role="group"
            aria-label="Pilih mode tampilan layar"
            className="flex items-center gap-1 shrink-0"
          >
            {modeOptions.map((opt) => {
              const active = preference === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPreference(opt.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#1C1917] text-[#FAF8F5]'
                      : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#E6E1D6]/60'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('beranda');
          }}
          className={`font-display font-bold tracking-tight text-[#1C1917] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#9A3412] ${
            isMobile ? 'text-lg' : 'text-xl md:text-2xl'
          }`}
        >
          {SANGGAR_INFO.shortName}
        </a>

        {/* Zone 2: Navigation links (shown on Desktop mode) */}
        {!isMobile && !isTablet && (
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57534E]">
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
        )}

        {/* Zone 3: Primary CTA & Menu Toggle */}
        <div className="flex items-center gap-2.5">
          {!isMobile && (
            <button
              type="button"
              onClick={() => handleNavClick('pendaftaran')}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Daftar Anggota Baru
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className={`${
              !isMobile && !isTablet ? 'lg:hidden' : ''
            } inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E6E1D6] text-[#1C1917] hover:bg-[#F2EFE9] transition-colors cursor-pointer`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tablet Compact Navigation Strip */}
      {isTablet && !mobileMenuOpen && (
        <div className="border-t border-[#E6E1D6]/70 bg-[#FAF8F5] px-6 py-2 overflow-x-auto">
          <nav className="flex items-center justify-between gap-4 text-xs font-semibold text-[#57534E]">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="hover:text-[#9A3412] transition-colors whitespace-nowrap py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E6E1D6] bg-[#FAF8F5] px-4 sm:px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="py-2.5 text-sm font-medium text-[#1C1917] hover:text-[#9A3412] border-b border-[#E6E1D6]/60 last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('pendaftaran')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap cursor-pointer"
            >
              Daftar Anggota Baru via WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
