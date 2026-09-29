import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useViewport } from '../context/ViewportContext';
import { JADWAL_LATIHAN, SANGGAR_INFO } from '../data/sanggarData';

interface RegistrationSectionProps {
  preselectedProgram: string;
  preselectedSchedule: string;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  preselectedProgram,
  preselectedSchedule,
}) => {
  const { effectiveMode } = useViewport();
  const isMobile = effectiveMode === 'mobile';
  const isTablet = effectiveMode === 'tablet';
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [parentOrRegistrant, setParentOrRegistrant] = useState('Pendaftar Langsung (Murid)');
  const [whatsappContact, setWhatsappContact] = useState('');
  const [domicile, setDomicile] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(
    preselectedProgram || JADWAL_LATIHAN[0].programName
  );
  const [schedulePreference, setSchedulePreference] = useState(
    preselectedSchedule || `${JADWAL_LATIHAN[0].days} (${JADWAL_LATIHAN[0].timeRange})`
  );
  const [experienceLevel, setExperienceLevel] = useState('Pemula (Belum pernah ikut sanggar)');
  const [notes, setNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [submittedWaUrl, setSubmittedWaUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (preselectedProgram) {
      setSelectedProgram(preselectedProgram);
    }
    if (preselectedSchedule) {
      setSchedulePreference(preselectedSchedule);
    }
  }, [preselectedProgram, preselectedSchedule]);

  const handleProgramChange = (programName: string) => {
    setSelectedProgram(programName);
    const matched = JADWAL_LATIHAN.find((item) => item.programName === programName);
    if (matched) {
      setSchedulePreference(`${matched.days} (${matched.timeRange})`);
    }
  };

  const formattedMessage = [
    `Halo Admin *${SANGGAR_INFO.name}*,`,
    `Saya ingin mendaftar sebagai anggota baru dengan rincian berikut:`,
    ``,
    `*DATA CALON ANGGOTA*`,
    `• Nama Lengkap: ${fullName.trim() || '-'}`,
    `• Usia: ${age.trim() ? `${age.trim()} Tahun` : '-'}`,
    `• Status Pendaftar: ${parentOrRegistrant}`,
    `• Nomor WhatsApp: ${whatsappContact.trim() || '-'}`,
    `• Alamat Domisili: ${domicile.trim() || '-'}`,
    ``,
    `*PILIHAN PROGRAM LATIHAN*`,
    `• Kelas Tari: ${selectedProgram}`,
    `• Jadwal Rutin: ${schedulePreference}`,
    `• Pengalaman Menari: ${experienceLevel}`,
    notes.trim() ? `• Catatan Tambahan: ${notes.trim()}` : null,
    ``,
    `Mohon informasi langkah konfirmasi pendaftaran dan jadwal latihan perdana di studio Jl. Babakan Baru Gg. Aster No.04. Terima kasih.`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const whatsappDirectUrl = `https://wa.me/${SANGGAR_INFO.whatsappNumber}?text=${encodeURIComponent(
    formattedMessage
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Mohon isi nama lengkap calon anggota.');
      return;
    }
    if (!age.trim()) {
      setErrorMsg('Mohon isi usia calon anggota.');
      return;
    }
    if (!whatsappContact.trim() || whatsappContact.trim().length < 9) {
      setErrorMsg('Mohon isi nomor WhatsApp aktif yang valid.');
      return;
    }
    if (!domicile.trim()) {
      setErrorMsg('Mohon isi alamat atau kecamatan domisili.');
      return;
    }

    setErrorMsg('');
    setSubmittedWaUrl(whatsappDirectUrl);

    if (hiddenLinkRef.current) {
      hiddenLinkRef.current.href = whatsappDirectUrl;
      hiddenLinkRef.current.click();
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="pendaftaran"
      className={`${
        isMobile ? 'py-12' : isTablet ? 'py-16' : 'py-20 md:py-24'
      } border-b border-[#E6E1D6] bg-[#F2EFE9]/80`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-2xl pb-8 sm:pb-12">
          <p className="text-xs text-[#78716C] mb-2.5">
            Penerimaan Murid Baru · Terhubung Otomatis ke WhatsApp Resmi
          </p>
          <h2
            className={`font-display font-bold text-[#1C1917] tracking-tight ${
              isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-3xl md:text-4xl'
            }`}
          >
            Formulir Pendaftaran Anggota Baru
          </h2>
          <p className={`mt-3 text-[#57534E] ${isMobile ? 'text-sm' : 'text-base'}`}>
            Isi biodata calon murid dan program kelas yang diminati di bawah ini. Saat tombol
            pendaftaran ditekan, formulir akan otomatis menyusun pesan terformat dan langsung
            mengarah ke WhatsApp Pengurus Sanggar ({SANGGAR_INFO.whatsappDisplay}).
          </p>
        </div>

        <div
          className={`grid ${
            isMobile || isTablet
              ? 'grid-cols-1 gap-8'
              : 'grid-cols-1 lg:grid-cols-12 gap-10'
          } items-start`}
        >
          {/* Left Column: Registration Form */}
          <form
            onSubmit={handleSubmit}
            className={`${
              isMobile || isTablet ? '' : 'lg:col-span-7'
            } p-5 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E6E1D6] space-y-6`}
          >
            {errorMsg && (
              <div
                role="alert"
                className="p-3.5 rounded-lg bg-[#9A3412]/10 border border-[#9A3412]/30 text-xs font-semibold text-[#9A3412]"
              >
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="reg-fullname"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Nama Lengkap Calon Anggota *
                </label>
                <input
                  id="reg-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Citra Kirana Putri"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label
                  htmlFor="reg-age"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Usia Calon Anggota (Tahun) *
                </label>
                <input
                  id="reg-age"
                  type="number"
                  min={4}
                  max={65}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Contoh: 12"
                  className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label
                  htmlFor="reg-status"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Status Pendaftar
                </label>
                <select
                  id="reg-status"
                  value={parentOrRegistrant}
                  onChange={(e) => setParentOrRegistrant(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                >
                  <option value="Pendaftar Langsung (Murid)">Pendaftar Langsung (Murid)</option>
                  <option value="Orang Tua / Wali Murid">Orang Tua / Wali Murid</option>
                  <option value="Perwakilan Sekolah / Instansi">
                    Perwakilan Sekolah / Instansi
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="reg-wa"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  id="reg-wa"
                  type="tel"
                  value={whatsappContact}
                  onChange={(e) => setWhatsappContact(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-domicile"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                Alamat / Kecamatan Domisili di Bandung *
              </label>
              <input
                id="reg-domicile"
                type="text"
                value={domicile}
                onChange={(e) => setDomicile(e.target.value)}
                placeholder="Contoh: Kel. Sukapada, Kec. Cibeunying Kidul, Kota Bandung"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-[#E6E1D6]">
              <div>
                <label
                  htmlFor="reg-program"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Pilihan Program Kelas Tari
                </label>
                <select
                  id="reg-program"
                  value={selectedProgram}
                  onChange={(e) => handleProgramChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                >
                  {JADWAL_LATIHAN.map((item) => (
                    <option key={item.id} value={item.programName}>
                      {item.programName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="reg-schedule"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Jadwal Latihan yang Dipilih
                </label>
                <input
                  id="reg-schedule"
                  type="text"
                  value={schedulePreference}
                  onChange={(e) => setSchedulePreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-exp"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                Pengalaman Menari Sebelumnya
              </label>
              <select
                id="reg-exp"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
              >
                <option value="Pemula (Belum pernah ikut sanggar)">
                  Pemula (Belum pernah ikut sanggar)
                </option>
                <option value="Pernah belajar dasar tari di sekolah">
                  Pernah belajar dasar tari di sekolah
                </option>
                <option value="Sudah menguasai beberapa tarian tradisional">
                  Sudah menguasai beberapa tarian tradisional
                </option>
                <option value="Persiapan lomba / ujian praktik khusus">
                  Persiapan lomba / ujian praktik khusus
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="reg-notes"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                id="reg-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Ingin mulai latihan hari Sabtu minggu ini / menanyakan ketersediaan sampur"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            {/* Hidden anchor used for automatic WhatsApp navigation on submit */}
            <a
              ref={hiddenLinkRef}
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden"
              aria-hidden="true"
            >
              Buka WhatsApp
            </a>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-[#57534E]">
                Tujuan WhatsApp:{' '}
                <span className="font-mono-tabular font-semibold text-[#1C1917]">
                  {SANGGAR_INFO.whatsappDisplay}
                </span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Kirim Pendaftaran ke WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {submittedWaUrl && (
              <div className="p-4 rounded-xl bg-[#F2EFE9] border border-[#9A3412]/40 space-y-3">
                <p className="text-xs font-semibold text-[#1C1917]">
                  Format pendaftaran Anda siap dikirim ke WhatsApp Sanggar Pitaloka Kusuma Putri.
                  Jika tab WhatsApp belum terbuka otomatis, klik tombol langsung di bawah ini:
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={submittedWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#1C1917] rounded-lg hover:bg-[#292524] transition-colors whitespace-nowrap"
                  >
                    <span>Lanjutkan Buka WhatsApp ({SANGGAR_INFO.whatsappRaw})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1C1917] border border-[#D6CFC2] rounded-lg hover:bg-[#FAF8F5] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Pesan Tersalin' : 'Salin Isi Formulir'}</span>
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Right Column: Live WhatsApp Format Preview & Registration Guide */}
          <div className={`${isMobile || isTablet ? '' : 'lg:col-span-5'} space-y-6`}>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1C1917] text-[#FAF8F5] space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <div className="text-xs text-[#D6D3D1]">Pratinjau Pesan Otomatis</div>
                  <h3 className="font-display text-2xl font-bold text-[#FDE68A] mt-0.5">
                    Format WhatsApp Pendaftaran
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FAF8F5] border border-white/20 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
                </button>
              </div>

              <pre className="text-xs text-[#E7E5E4] font-mono-tabular whitespace-pre-wrap leading-relaxed bg-black/30 p-4 rounded-xl border border-white/10">
                {formattedMessage}
              </pre>

              <div className="pt-2 space-y-2 text-xs text-[#D6D3D1]">
                <p>
                  01. Pendaftaran tidak dipungut biaya saat pengisian formulir online ini.
                </p>
                <p>
                  02. Admin sanggar akan membalas pesan WhatsApp Anda untuk konfirmasi ketersediaan
                  kuota dan jadwal kedatangan perdana di Gg. Aster No.04.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
