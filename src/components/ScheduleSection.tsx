import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { JADWAL_LATIHAN, SANGGAR_INFO, ScheduleItem } from '../data/sanggarData';

interface ScheduleSectionProps {
  onSelectProgramForRegistration: (programName: string, days: string) => void;
  onInquireCourse: (programName: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onSelectProgramForRegistration,
  onInquireCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Anak', 'Remaja & Dewasa', 'Klasik & Prestasi', 'Privat'];

  const filteredSchedule: ScheduleItem[] =
    selectedCategory === 'Semua'
      ? JADWAL_LATIHAN
      : JADWAL_LATIHAN.filter((item) => item.category === selectedCategory);

  return (
    <section id="jadwal" className="py-20 md:py-24 border-b border-[#E6E1D6] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#E6E1D6]">
          <div className="max-w-2xl">
            <p className="text-xs text-[#78716C] mb-3">
              Kurikulum Berjenjang · Latihan Mulai Pukul 19.00 WIB
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] tracking-tight">
              Jadwal Latihan & Program Kelas Tari
            </h2>
            <p className="mt-4 text-base text-[#57534E]">
              Setiap sesi latihan rutin dimulai pukul 19.00 WIB dan dirancang mengikuti tahap
              penguasaan gerak (Wiraga, Wirama, Wirasa). Untuk rincian biaya kursus dan pendaftaran,
              silakan berkonsultasi langsung melalui WhatsApp pengurus sanggar.
            </p>
          </div>

          {/* Interactive Filter Controls (Functional Buttons) */}
          <div
            role="tablist"
            aria-label="Filter kategori kelas tari"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2EFE9] rounded-xl border border-[#E6E1D6] self-start"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Numbered Schedule List */}
        <div className="divide-y divide-[#E6E1D6]">
          {filteredSchedule.map((item) => {
            const waConsultUrl = `https://wa.me/${SANGGAR_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Halo Admin ${SANGGAR_INFO.name}, saya ingin berkonsultasi mengenai rincian biaya dan jadwal untuk *${item.programName}* (${item.days}, ${item.timeRange}). Mohon informasinya, terima kasih.`
            )}`;

            return (
              <article
                key={item.id}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-colors hover:bg-[#F2EFE9]/40 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
              >
                {/* Column 1: Editorial Index & Program Title (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span className="font-mono-tabular font-semibold text-[#9A3412]">
                      {item.indexNumber}.
                    </span>
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.ageGroup}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.level}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-[28px] font-bold text-[#1C1917] leading-snug">
                    {item.programName}
                  </h3>

                  <p className="text-xs text-[#57534E]">
                    Status Kuota:{' '}
                    <span className="text-[#1C1917] font-semibold">{item.quotaStatus}</span>
                  </p>
                </div>

                {/* Column 2: Schedule Time & Curriculum Focus (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-4 rounded-lg bg-[#F2EFE9] border border-[#E6E1D6]">
                    <div className="text-xs text-[#78716C]">Hari & Jam Latihan Rutin</div>
                    <div className="mt-1 font-semibold text-sm text-[#1C1917]">{item.days}</div>
                    <div className="mt-0.5 font-mono-tabular text-xs text-[#9A3412] font-semibold">
                      {item.timeRange} · {item.duration}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[#1C1917]">
                      Materi & Fokus Pembelajaran:
                    </div>
                    <ul className="space-y-1.5 text-sm text-[#57534E]">
                      {item.curriculumFocus.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">
                          — {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 3: WhatsApp Fee Consultation & Direct Registration Action (3 cols) */}
                <div className="lg:col-span-3 flex flex-col justify-between lg:items-end lg:text-right gap-5">
                  <div>
                    <div className="text-xs text-[#78716C]">Informasi Biaya & Administrasi</div>
                    <div className="font-display text-xl font-bold text-[#1C1917] mt-0.5">
                      Konsultasi via WhatsApp
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">
                      Hubungi pengurus untuk rincian iuran sesuai jenjang kelas
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
                    <a
                      href={waConsultUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap"
                    >
                      <span>Konsultasi Biaya via WA</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        onSelectProgramForRegistration(
                          item.programName,
                          `${item.days} (${item.timeRange})`
                        )
                      }
                      className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#1C1917] bg-[#F2EFE9] border border-[#D6CFC2] rounded-lg hover:bg-[#E6E1D6]/70 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Pilih & Daftar Kelas Ini
                    </button>

                    <button
                      type="button"
                      onClick={() => onInquireCourse(item.programName)}
                      className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#57534E] bg-transparent hover:text-[#1C1917] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Tanya Detail Kurikulum
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

