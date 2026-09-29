import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALERI_FOTO, GalleryItem, SANGGAR_INFO } from '../data/sanggarData';
import { ResilientImage } from './ResilientImage';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    'Semua',
    'Pertunjukan',
    'Klasik & Busana',
    'Latihan Rutin',
    'Pembinaan Anak',
  ];

  const filteredGallery: GalleryItem[] =
    activeCategory === 'Semua'
      ? GALERI_FOTO
      : GALERI_FOTO.filter((item) => item.category === activeCategory);

  const selectedPhoto =
    selectedPhotoIndex !== null && filteredGallery[selectedPhotoIndex]
      ? filteredGallery[selectedPhotoIndex]
      : null;

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + filteredGallery.length) % filteredGallery.length
    );
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredGallery.length);
  };

  return (
    <section id="galeri" className="py-20 md:py-24 border-b border-[#E6E1D6] bg-[#F2EFE9]/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12">
          <div className="max-w-2xl">
            <p className="text-xs text-[#78716C] mb-3">
              Arsip Visual · Panggung Budaya & Latihan Studio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] tracking-tight">
              Galeri Foto Kegiatan & Pementasan
            </h2>
            <p className="mt-4 text-base text-[#57534E]">
              Dokumentasi latihan rutin di studio Sukapada hingga pementasan tari tradisional
              Sunda di berbagai panggung seni Kota Bandung dan Jawa Barat. Klik pada foto untuk
              melihat detail koreografi.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter galeri foto sanggar"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF8F5] rounded-xl border border-[#E6E1D6] self-start"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedPhotoIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5]'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Bento Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => {
            const isFeatured = idx === 0 && activeCategory === 'Semua';
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl border border-[#E6E1D6] bg-[#1C1917] flex flex-col justify-end ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 min-h-[380px] md:min-h-[440px]'
                    : 'min-h-[340px]'
                }`}
              >
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  fallbackLabel={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                />

                {/* Measured Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Interactive Expand Trigger */}
                <button
                  type="button"
                  onClick={() => setSelectedPhotoIndex(idx)}
                  aria-label={`Perbesar foto ${item.title}`}
                  className="absolute inset-0 z-10 w-full h-full text-left flex flex-col justify-end p-6 sm:p-8 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDE68A]"
                >
                  <div className="w-full flex items-center justify-between gap-4 mb-2">
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#E7E5E4]/90">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.eventDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{item.dancersCount}</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FDE68A] opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap shrink-0">
                      <Expand className="w-3.5 h-3.5" />
                      <span>Lihat Detail</span>
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FAF8F5] tracking-wide leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#E7E5E4]/85 line-clamp-2 max-w-2xl">
                    {item.description}
                  </p>
                </button>
              </div>
            );
          })}
        </div>

        {/* Social Media Video Documentation Bar */}
        <div className="mt-10 pt-8 border-t border-[#E6E1D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-[#57534E]">
            Ingin melihat cuplikan video latihan rutin dan keseruan pentas penari kami? Ikuti
            dokumentasi harian resmi di kanal media sosial Sanggar Pitaloka Kusuma Putri.
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={SANGGAR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-[#1C1917] bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg hover:bg-[#E6E1D6]/50 transition-colors whitespace-nowrap"
            >
              Instagram {SANGGAR_INFO.instagramHandle}
            </a>
            <a
              href={SANGGAR_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-[#1C1917] bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg hover:bg-[#E6E1D6]/50 transition-colors whitespace-nowrap"
            >
              TikTok {SANGGAR_INFO.tiktokHandle}
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Detail Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6"
        >
          <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl border border-[#E6E1D6] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E1D6]">
              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                <span>{selectedPhoto.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedPhoto.eventDate}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{selectedPhoto.dancersCount}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Tutup pratinjau foto"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E6E1D6] text-[#1C1917] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 bg-[#1C1917] flex items-center justify-center min-h-[280px] sm:min-h-[380px]">
                <ResilientImage
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full max-h-[460px] object-cover"
                />
              </div>

              <div className="md:col-span-5 p-6 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <h3
                    id="lightbox-title"
                    className="font-display text-2xl font-bold text-[#1C1917] leading-snug"
                  >
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                  <div className="pt-3 border-t border-[#E6E1D6] space-y-1.5 text-xs text-[#57534E]">
                    <div>
                      <span className="font-semibold text-[#1C1917]">Formasi:</span>{' '}
                      {selectedPhoto.dancersCount}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${SANGGAR_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Halo Admin ${SANGGAR_INFO.name}, saya tertarik setelah melihat galeri "${selectedPhoto.title}". Boleh minta informasi kelas atau undangan pentas untuk tarian ini?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap"
                  >
                    Tanya Tarian Ini via WhatsApp
                  </a>

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1C1917] border border-[#D6CFC2] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Foto Sebelumnya</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1C1917] border border-[#D6CFC2] rounded-lg hover:bg-[#F2EFE9] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Foto Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
