import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SANGGAR_INFO } from './data/sanggarData';
import { Navbar } from './components/Navbar';
import { ScheduleSection } from './components/ScheduleSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RegistrationSection } from './components/RegistrationSection';
import { ContactAndMapSection } from './components/ContactAndMapSection';
import { ResilientImage } from './components/ResilientImage';

export default function App() {
  const [preselectedProgram, setPreselectedProgram] = useState<string>(
    'Kelas Dasar Tari Anak (Sekar Alit)'
  );
  const [preselectedSchedule, setPreselectedSchedule] = useState<string>(
    'Sabtu & Minggu (Mulai 19.00 – 20.30 WIB)'
  );
  const [inquiryTopic, setInquiryTopic] = useState<string>(
    'Informasi Kurikulum & Kelas Pemula'
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectProgramForRegistration = (programName: string, daysAndTime: string) => {
    setPreselectedProgram(programName);
    setPreselectedSchedule(daysAndTime);
    scrollToSection('pendaftaran');
  };

  const handleInquireCourse = (programName: string) => {
    setInquiryTopic(programName);
    scrollToSection('kontak');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* Top Bar Contract Navigation */}
      <Navbar onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="beranda"
          className="relative py-14 md:py-20 lg:py-24 border-b border-[#E6E1D6] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Editorial Copy (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                {/* Clean unboxed regional trust marker */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
                  <span>Pusat Pelatihan Tari Tradisional</span>
                  <span aria-hidden="true">·</span>
                  <span>Kec. Cibeunying Kidul, Kota Bandung</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1C1917] leading-[1.08] tracking-tight">
                  {SANGGAR_INFO.name}
                </h1>

                <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl">
                  Ruang tumbuh generasi muda Bandung dalam mempelajari seni tari tradisional Sunda
                  dan Nusantara. Membina kehalusan budi, ketepatan wirama, serta keberanian tampil
                  di panggung budaya sejak usia dini hingga tingkat prestasi.
                </p>

                {/* Primary CTA & Secondary Navigation Action */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('pendaftaran')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Daftar Anggota Baru via WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('jadwal')}
                    className="inline-flex items-center justify-center px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#1C1917] bg-[#F2EFE9] border border-[#D6CFC2] rounded-lg hover:bg-[#E6E1D6]/70 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Lihat Jadwal Latihan
                  </button>
                </div>

                {/* Quantitative Studio Proof Metrics */}
                <div className="pt-6 border-t border-[#E6E1D6] grid grid-cols-3 gap-6">
                  <div>
                    <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                      4 Kelas
                    </div>
                    <div className="text-xs text-[#78716C] mt-1">
                      Anak, Remaja, Klasik & Privat
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                      50+ Murid
                    </div>
                    <div className="text-xs text-[#78716C] mt-1">
                      Aktif berlatih setiap pekan
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                      30+ Pentas
                    </div>
                    <div className="text-xs text-[#78716C] mt-1">
                      Festival, pasanggiri & adat
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Dominant Visual Carrier (6 cols) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-[#E6E1D6] bg-[#1C1917] shadow-lg">
                  <ResilientImage
                    src={SANGGAR_INFO.heroImage}
                    alt="Penari tradisional Sunda Sanggar Pitaloka Kusuma Putri tampil di atas panggung"
                    className="w-full h-auto object-contain block"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <div className="text-xs text-[#FDE68A] font-semibold">
                        Repertoar Unggulan Sanggar
                      </div>
                      <div className="font-display text-lg sm:text-xl font-bold text-[#FAF8F5]">
                        Tari Jaipong Kreasi, Tari Merak & Klasik Pasundan
                      </div>
                    </div>
                    <div className="text-xs text-[#E7E5E4] font-mono-tabular shrink-0">
                      WA: {SANGGAR_INFO.whatsappDisplay}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Schedule & Curriculum Section */}
        <ScheduleSection
          onSelectProgramForRegistration={handleSelectProgramForRegistration}
          onInquireCourse={handleInquireCourse}
        />

        {/* Photo Gallery Section */}
        <GallerySection />

        {/* Student & Parent Testimonials Section */}
        <TestimonialsSection />

        {/* New Member Registration to WhatsApp Section */}
        <RegistrationSection
          preselectedProgram={preselectedProgram}
          preselectedSchedule={preselectedSchedule}
        />

        {/* Contact Inquiry, Social Media & Google Maps Location Section */}
        <ContactAndMapSection initialInquiryTopic={inquiryTopic} />
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#1C1917] text-[#E7E5E4] border-t border-[#292524] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <div className="font-display text-2xl font-bold text-[#FAF8F5]">
                {SANGGAR_INFO.name}
              </div>
              <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm">
                {SANGGAR_INFO.address}
              </p>
              <p className="text-xs text-[#D6D3D1] font-mono-tabular pt-1">
                WhatsApp Resmi: {SANGGAR_INFO.whatsappDisplay} ({SANGGAR_INFO.whatsappRaw})
              </p>
            </div>

            <div className="md:col-span-4 space-y-2.5">
              <div className="text-xs font-semibold text-[#FAF8F5]">Navigasi Halaman</div>
              <ul className="space-y-2 text-xs text-[#A8A29E]">
                <li>
                  <a
                    href="#jadwal"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('jadwal');
                    }}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    Jadwal Latihan & Program Kursus
                  </a>
                </li>
                <li>
                  <a
                    href="#galeri"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('galeri');
                    }}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    Galeri Dokumentasi Pementasan
                  </a>
                </li>
                <li>
                  <a
                    href="#testimoni"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('testimoni');
                    }}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    Testimoni Murid & Wali Murid
                  </a>
                </li>
                <li>
                  <a
                    href="#pendaftaran"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('pendaftaran');
                    }}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    Formulir Pendaftaran Anggota Baru
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <div className="text-xs font-semibold text-[#FAF8F5]">Media Sosial Resmi</div>
              <ul className="space-y-2 text-xs text-[#A8A29E]">
                <li>
                  <a
                    href={SANGGAR_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FDE68A] transition-colors"
                  >
                    Instagram ({SANGGAR_INFO.instagramHandle})
                  </a>
                </li>
                <li>
                  <a
                    href={SANGGAR_INFO.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FDE68A] transition-colors"
                  >
                    TikTok ({SANGGAR_INFO.tiktokHandle})
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${SANGGAR_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FDE68A] transition-colors"
                  >
                    WhatsApp ({SANGGAR_INFO.whatsappRaw})
                  </a>
                </li>
                <li>
                  <a
                    href={SANGGAR_INFO.googleMapsDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FDE68A] transition-colors"
                  >
                    Peta Lokasi Google Maps
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A29E]">
            <div>
              © {new Date().getFullYear()} {SANGGAR_INFO.name}. Kota Bandung, Jawa Barat.
            </div>
            <div>Kel. Sukapada, Kec. Cibeunying Kidul, Bandung</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
