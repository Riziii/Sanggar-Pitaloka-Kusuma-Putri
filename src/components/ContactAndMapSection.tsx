import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useViewport } from '../context/ViewportContext';
import { DAFTAR_FAQ, SANGGAR_INFO } from '../data/sanggarData';

interface ContactAndMapSectionProps {
  initialInquiryTopic: string;
}

export const ContactAndMapSection: React.FC<ContactAndMapSectionProps> = ({
  initialInquiryTopic,
}) => {
  const { effectiveMode } = useViewport();
  const isMobile = effectiveMode === 'mobile';
  const isTablet = effectiveMode === 'tablet';
  const [senderName, setSenderName] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState(
    initialInquiryTopic || 'Informasi Kurikulum & Kelas Pemula'
  );
  const [questionText, setQuestionText] = useState('');
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySentUrl, setInquirySentUrl] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const inquiryLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (initialInquiryTopic) {
      setInquiryTopic(`Informasi Kursus: ${initialInquiryTopic}`);
    }
  }, [initialInquiryTopic]);

  const composeInquiryMessage = () => {
    return [
      `Halo Admin *${SANGGAR_INFO.name}*,`,
      `Perkenalkan saya *${senderName.trim() || 'Calon Murid / Wali'}*.`,
      ``,
      `Saya ingin menanyakan informasi lebih lanjut mengenai:`,
      `*Topik Kursus:* ${inquiryTopic}`,
      `*Pertanyaan:* ${
        questionText.trim() ||
        'Mohon informasi rincian jadwal, biaya kursus, serta persyaratan bergabung untuk program tersebut.'
      }`,
      ``,
      `Terima kasih.`,
    ].join('\n');
  };

  const inquiryWaUrl = `https://wa.me/${SANGGAR_INFO.whatsappNumber}?text=${encodeURIComponent(
    composeInquiryMessage()
  )}`;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) {
      setInquiryError('Mohon tuliskan nama Anda terlebih dahulu.');
      return;
    }
    if (!questionText.trim()) {
      setInquiryError('Mohon tuliskan pertanyaan Anda mengenai kursus yang tersedia.');
      return;
    }

    setInquiryError('');
    setInquirySentUrl(inquiryWaUrl);

    if (inquiryLinkRef.current) {
      inquiryLinkRef.current.href = inquiryWaUrl;
      inquiryLinkRef.current.click();
    }
  };

  return (
    <section
      id="kontak"
      className={`${isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20 md:py-24'} bg-[#FAF8F5]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-20">
        {/* Part 1: Course Inquiry & Official Channels */}
        <div>
          <div className="max-w-2xl pb-8 sm:pb-12">
            <p className="text-xs text-[#78716C] mb-2.5">
              Layanan Informasi Kursus · Konsultasi Kelas & Undangan Pentas
            </p>
            <h2
              className={`font-display font-bold text-[#1C1917] tracking-tight ${
                isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-3xl md:text-4xl'
              }`}
            >
              Hubungi Kami & Tanya Informasi Kursus
            </h2>
            <p className={`mt-3 text-[#57534E] ${isMobile ? 'text-sm' : 'text-base'}`}>
              Masih ragu memilih kelas yang sesuai untuk usia Anda atau putra-putri Anda? Kirimkan
              pertanyaan seputar kurikulum kursus, jadwal coba latihan (trial), maupun ketersediaan
              kelas privat melalui formulir konsultasi atau kanal resmi kami.
            </p>
          </div>

          <div
            className={`grid ${
              isMobile || isTablet
                ? 'grid-cols-1 gap-8'
                : 'grid-cols-1 lg:grid-cols-12 gap-10'
            } items-start`}
          >
            {/* Course Inquiry Form */}
            <form
              onSubmit={handleInquirySubmit}
              className={`${
                isMobile || isTablet ? '' : 'lg:col-span-6'
              } p-5 sm:p-8 rounded-2xl bg-[#F2EFE9] border border-[#E6E1D6] space-y-5`}
            >
              <div className="border-b border-[#E6E1D6] pb-4">
                <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                  Tanya Informasi Kursus via WhatsApp
                </h3>
                <p className="text-xs text-[#57534E] mt-1">
                  Pesan pertanyaan Anda akan langsung diteruskan ke nomor resmi WhatsApp{' '}
                  <span className="font-mono-tabular font-semibold text-[#1C1917]">
                    {SANGGAR_INFO.whatsappRaw}
                  </span>
                  .
                </p>
              </div>

              {inquiryError && (
                <p role="alert" className="text-xs font-semibold text-[#9A3412]">
                  {inquiryError}
                </p>
              )}

              <div>
                <label
                  htmlFor="inq-name"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Nama Anda *
                </label>
                <input
                  id="inq-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Contoh: Ibu Ratna / Karina"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label
                  htmlFor="inq-topic"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Topik Informasi Kursus yang Ditanyakan
                </label>
                <select
                  id="inq-topic"
                  value={inquiryTopic}
                  onChange={(e) => setInquiryTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                >
                  <option value="Informasi Kurikulum & Kelas Pemula">
                    Informasi Kurikulum & Kelas Pemula
                  </option>
                  <option value="Informasi Kursus: Kelas Dasar Tari Anak (Sekar Alit)">
                    Informasi Kursus: Kelas Dasar Tari Anak (Sekar Alit)
                  </option>
                  <option value="Informasi Kursus: Kelas Jaipong Kreasi & Mojang Priangan">
                    Informasi Kursus: Kelas Jaipong Kreasi & Mojang Priangan
                  </option>
                  <option value="Informasi Kursus: Kelas Tari Klasik Sunda & Tari Merak">
                    Informasi Kursus: Kelas Tari Klasik Sunda & Tari Merak
                  </option>
                  <option value="Informasi Kursus: Kelas Privat & Persiapan Ujian / Lomba">
                    Informasi Kursus: Kelas Privat & Persiapan Ujian / Lomba
                  </option>
                  <option value="Jadwal Sesi Coba Latihan (Trial Class)">
                    Jadwal Sesi Coba Latihan (Trial Class)
                  </option>
                  <option value="Undangan Pentas Tari / Acara Adat Mapag Panganten">
                    Undangan Pentas Tari / Acara Adat Mapag Panganten
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="inq-question"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Pertanyaan Anda *
                </label>
                <textarea
                  id="inq-question"
                  rows={4}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Tuliskan hal yang ingin ditanyakan mengenai kelas, usia murid, seragam, atau jadwal..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <a
                ref={inquiryLinkRef}
                href={inquiryWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden"
                aria-hidden="true"
              >
                Kirim Pertanyaan WhatsApp
              </a>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Tanyakan Sekarang ke WhatsApp ({SANGGAR_INFO.whatsappRaw})</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>

              {inquirySentUrl && (
                <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#D6CFC2] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#57534E]">
                    Pesan siap dikirim ke pengurus sanggar.
                  </span>
                  <a
                    href={inquirySentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#9A3412] hover:underline whitespace-nowrap"
                  >
                    Buka Chat WhatsApp →
                  </a>
                </div>
              )}
            </form>

            {/* Right Column: Official Contact Directory & FAQ */}
            <div className={`${isMobile || isTablet ? '' : 'lg:col-span-6'} space-y-8`}>
              {/* Direct Contact & Social Links */}
              <div
                className={`grid ${
                  isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 sm:grid-cols-3 gap-4'
                }`}
              >
                <a
                  href={`https://wa.me/${SANGGAR_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl bg-[#F2EFE9] border border-[#E6E1D6] hover:border-[#9A3412] transition-colors flex flex-col justify-between gap-3 group"
                >
                  <div className="text-xs text-[#78716C]">WhatsApp Resmi</div>
                  <div>
                    <div className="font-mono-tabular text-sm font-semibold text-[#1C1917] group-hover:text-[#9A3412] transition-colors">
                      {SANGGAR_INFO.whatsappRaw}
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">Respon cepat setiap hari</div>
                  </div>
                </a>

                <a
                  href={SANGGAR_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl bg-[#F2EFE9] border border-[#E6E1D6] hover:border-[#9A3412] transition-colors flex flex-col justify-between gap-3 group"
                >
                  <div className="text-xs text-[#78716C]">Instagram Resmi</div>
                  <div>
                    <div className="font-mono-tabular text-sm font-semibold text-[#1C1917] group-hover:text-[#9A3412] transition-colors">
                      {SANGGAR_INFO.instagramHandle}
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">Galeri & info kegiatan</div>
                  </div>
                </a>

                <a
                  href={SANGGAR_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl bg-[#F2EFE9] border border-[#E6E1D6] hover:border-[#9A3412] transition-colors flex flex-col justify-between gap-3 group"
                >
                  <div className="text-xs text-[#78716C]">TikTok Resmi</div>
                  <div>
                    <div className="font-mono-tabular text-sm font-semibold text-[#1C1917] group-hover:text-[#9A3412] transition-colors">
                      {SANGGAR_INFO.tiktokHandle}
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">Video koreografi & latihan</div>
                  </div>
                </a>
              </div>

              {/* Frequently Asked Questions about Courses */}
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                  Pertanyaan Umum Seputar Kursus
                </h3>
                <div className="divide-y divide-[#E6E1D6] border-t border-b border-[#E6E1D6]">
                  {DAFTAR_FAQ.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="py-4">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between gap-4 text-left text-sm font-semibold text-[#1C1917] hover:text-[#9A3412] transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                              isOpen ? 'rotate-180 text-[#9A3412]' : 'text-[#78716C]'
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="mt-2.5 text-sm text-[#57534E] leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Google Maps Studio Location Integration */}
        <div className="pt-10 sm:pt-12 border-t border-[#E6E1D6]">
          <div
            className={`grid ${
              isMobile || isTablet
                ? 'grid-cols-1 gap-6'
                : 'grid-cols-1 lg:grid-cols-12 gap-8'
            } items-stretch`}
          >
            {/* Location Address & Visiting Details */}
            <div
              className={`${
                isMobile || isTablet ? '' : 'lg:col-span-5'
              } p-5 sm:p-8 rounded-2xl bg-[#F2EFE9] border border-[#E6E1D6] flex flex-col justify-between gap-6`}
            >
              <div className="space-y-4">
                <div className="text-xs text-[#78716C]">
                  Titik Lokasi Studio · Kota Bandung, Jawa Barat
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] leading-snug">
                  Lokasi Sanggar Pitaloka Kusuma Putri
                </h3>
                <p className="text-sm text-[#1C1917] font-semibold leading-relaxed">
                  {SANGGAR_INFO.address}
                </p>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Terletak strategis di kawasan Kelurahan Sukapada, Kecamatan Cibeunying Kidul,
                  Kota Bandung. Mudah dijangkau dari koridor Jl. Padasuka, Jl. PH.H. Mustofa
                  (Suci), maupun Terminal Cicaheum.
                </p>

                <div className="pt-4 border-t border-[#E6E1D6] space-y-2 text-xs text-[#57534E]">
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-[#1C1917]">Jam Mulai Latihan Studio:</span>
                    <span className="font-mono-tabular">Mulai Pukul 19.00 WIB</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-[#1C1917]">Telepon / WhatsApp:</span>
                    <span className="font-mono-tabular">{SANGGAR_INFO.whatsappDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={SANGGAR_INFO.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#1C1917] rounded-lg hover:bg-[#292524] transition-colors whitespace-nowrap"
                >
                  <span>Petunjuk Arah di Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>

                <a
                  href={`https://wa.me/${SANGGAR_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Admin ${SANGGAR_INFO.name}, saya ingin berkunjung ke studio di ${SANGGAR_INFO.address}. Apakah hari ini studio buka?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#1C1917] border border-[#D6CFC2] rounded-lg hover:bg-[#FAF8F5] transition-colors whitespace-nowrap"
                >
                  Janji Kunjungan Studio
                </a>
              </div>
            </div>

            {/* Embedded Interactive Google Maps */}
            <div
              className={`${
                isMobile || isTablet ? '' : 'lg:col-span-7'
              } min-h-[300px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#E6E1D6] bg-[#E6E1D6]/40`}
            >
              <iframe
                title="Peta Lokasi Sanggar Pitaloka Kusuma Putri di Jl. Babakan Baru Gg. Aster No.04, Kel. Sukapada, Kec. Cibeunying Kidul, Kota Bandung"
                src={SANGGAR_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px] sm:min-h-[420px] border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
