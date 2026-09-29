import React, { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { Lock, LogOut, ShieldCheck, Trash2 } from 'lucide-react';
import { JADWAL_LATIHAN, TestimonialItem } from '../data/sanggarData';
import { OperationType, auth, db, handleFirestoreError } from '../firebase';

interface BoardTestimonialItem extends TestimonialItem {
  authorUid: string;
  createdAtIso: string;
  isFromFirestore?: boolean;
}

const BOARD_COLLECTION = 'testimonials_board';
const BOARD_DOC_ID = 'public_feed';
const BOARD_PATH = `${BOARD_COLLECTION}/${BOARD_DOC_ID}`;
const LOCAL_BACKUP_KEY = 'sanggar_pitaloka_testimonials_v2_empty';
const PENGURUS_SESSION_KEY = 'sanggar_pitaloka_pengurus_session_v1';
const ACTIVE_ITEM_PREFIX = 'testi_v2_';

function loadLocalBackup(): BoardTestimonialItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_BACKUP_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) => item && typeof item.id === 'string' && item.id.startsWith(ACTIVE_ITEM_PREFIX)
    );
  } catch {
    return [];
  }
}

function saveLocalBackup(items: BoardTestimonialItem[]) {
  try {
    localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota errors
  }
}

function isPermissionDeniedError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return msg.includes('permission-denied') || msg.includes('missing or insufficient permissions');
}

export const TestimonialsSection: React.FC = () => {
  const [firestoreTestimonials, setFirestoreTestimonials] = useState<BoardTestimonialItem[]>(() =>
    loadLocalBackup()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);

  // Pengurus login state
  const [isPengurusSession, setIsPengurusSession] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(PENGURUS_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [showPengurusModal, setShowPengurusModal] = useState<boolean>(false);
  const [pengurusUsername, setPengurusUsername] = useState<string>('');
  const [pengurusPassword, setPengurusPassword] = useState<string>('');
  const [pengurusError, setPengurusError] = useState<string>('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [studentName, setStudentName] = useState('');
  const [role, setRole] = useState('');
  const [programTaken, setProgramTaken] = useState(JADWAL_LATIHAN[0].programName);
  const [joinPeriod, setJoinPeriod] = useState('Bergabung selama 1 tahun');
  const [quote, setQuote] = useState('');
  const [outcomeHighlight, setOutcomeHighlight] = useState('');
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const boardRef = doc(db, BOARD_COLLECTION, BOARD_DOC_ID);

    const unsubscribe = onSnapshot(
      boardRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const rawItems = Array.isArray(data.items) ? data.items : [];
          const parsed: BoardTestimonialItem[] = rawItems
            .map((entry: Record<string, unknown>) => ({
              id: String(entry.id || ''),
              studentName: String(entry.studentName || ''),
              role: String(entry.role || ''),
              programTaken: String(entry.programTaken || ''),
              joinPeriod: String(entry.joinPeriod || ''),
              quote: String(entry.quote || ''),
              outcomeHighlight: String(entry.outcomeHighlight || ''),
              authorUid: String(entry.authorUid || 'public_visitor'),
              createdAtIso: String(entry.createdAtIso || ''),
              isFromFirestore: true,
            }))
            .filter((item) => item.id.startsWith(ACTIVE_ITEM_PREFIX));
          setFirestoreTestimonials(parsed);
          saveLocalBackup(parsed);
        } else {
          setFirestoreTestimonials((prev) => (prev.length > 0 ? prev : []));
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        if (isPermissionDeniedError(error)) {
          handleFirestoreError(error, OperationType.GET, BOARD_PATH);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const isGoogleAdmin =
    authReady &&
    Boolean(currentUser?.emailVerified) &&
    currentUser?.email?.toLowerCase() === 'riziiirz@gmail.com';

  const isPengurus = isPengurusSession || isGoogleAdmin;

  const handlePengurusCodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPengurusError('');

    const cleanUser = pengurusUsername.trim().toLowerCase();
    const cleanPass = pengurusPassword.trim();

    const validUser =
      cleanUser === 'pengurus' ||
      cleanUser === 'admin' ||
      cleanUser === 'riziiirz@gmail.com' ||
      cleanUser === 'pitaloka';

    const validPass =
      cleanPass === 'pitaloka2026' ||
      cleanPass === '085871949535' ||
      cleanPass === 'sanggarpkp';

    if (validUser && validPass) {
      setIsPengurusSession(true);
      try {
        sessionStorage.setItem(PENGURUS_SESSION_KEY, 'true');
      } catch {
        // Ignore session storage errors
      }
      setPengurusUsername('');
      setPengurusPassword('');
      setShowPengurusModal(false);
    } else {
      setPengurusError('Akun atau kode akses pengurus tidak sesuai.');
    }
  };

  const handleGoogleSignIn = async () => {
    setPengurusError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email?.toLowerCase() === 'riziiirz@gmail.com') {
        setIsPengurusSession(true);
        try {
          sessionStorage.setItem(PENGURUS_SESSION_KEY, 'true');
        } catch {
          // Ignore
        }
        setShowPengurusModal(false);
      } else {
        setPengurusError(
          'Email Google ini bukan akun Pengurus Sanggar. Gunakan akun pengurus atau masukkan Kode Akses Pengurus.'
        );
      }
    } catch {
      setPengurusError(
        'Login Google gagal atau dibatalkan. Silakan gunakan formulir Kode Akses Pengurus di atas.'
      );
    }
  };

  const handlePengurusLogout = async () => {
    setIsPengurusSession(false);
    try {
      sessionStorage.removeItem(PENGURUS_SESSION_KEY);
    } catch {
      // Ignore
    }
    if (currentUser) {
      try {
        await signOut(auth);
      } catch {
        // Ignore
      }
    }
  };

  const sanitizeForFirestore = (item: BoardTestimonialItem) => ({
    id: item.id,
    studentName: item.studentName,
    role: item.role,
    programTaken: item.programTaken,
    joinPeriod: item.joinPeriod,
    quote: item.quote,
    outcomeHighlight: item.outcomeHighlight,
    authorUid: item.authorUid,
    createdAtIso: item.createdAtIso,
  });

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanName = studentName.trim().slice(0, 100);
    const cleanRole = role.trim().slice(0, 120);
    const cleanProgram = programTaken.trim().slice(0, 120);
    const cleanPeriod = (joinPeriod.trim() || 'Anggota Sanggar').slice(0, 80);
    const cleanQuote = quote.trim().slice(0, 1000);
    const cleanOutcome = outcomeHighlight.trim().slice(0, 200);

    if (cleanName.length < 2) {
      setFormError('Nama lengkap minimal terdiri dari 2 karakter.');
      return;
    }
    if (cleanRole.length < 2) {
      setFormError('Status / sekolah / domisili minimal terdiri dari 2 karakter.');
      return;
    }
    if (cleanQuote.length < 10) {
      setFormError('Cerita pengalaman belajar minimal terdiri dari 10 karakter.');
      return;
    }
    if (cleanOutcome.length < 3) {
      setFormError('Hasil atau capaian nyata minimal terdiri dari 3 karakter.');
      return;
    }

    setIsSubmitting(true);
    const itemId = `${ACTIVE_ITEM_PREFIX}${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const newEntry: BoardTestimonialItem = {
      id: itemId,
      studentName: cleanName,
      role: cleanRole,
      programTaken: cleanProgram,
      joinPeriod: cleanPeriod,
      quote: cleanQuote,
      outcomeHighlight: cleanOutcome,
      authorUid: currentUser ? currentUser.uid : 'public_visitor',
      createdAtIso: new Date().toISOString(),
      isFromFirestore: true,
    };

    const updatedEntries: BoardTestimonialItem[] = [newEntry, ...firestoreTestimonials].slice(
      0,
      50
    );
    const updatedList = updatedEntries.map(sanitizeForFirestore);

    setFirestoreTestimonials(updatedEntries);
    saveLocalBackup(updatedEntries);

    try {
      await setDoc(doc(db, BOARD_COLLECTION, BOARD_DOC_ID), {
        boardId: BOARD_DOC_ID,
        items: updatedList,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      if (isPermissionDeniedError(error)) {
        handleFirestoreError(error, OperationType.WRITE, BOARD_PATH);
      }
    } finally {
      setStudentName('');
      setRole('');
      setQuote('');
      setOutcomeHighlight('');
      setSubmitSuccess(true);
      setShowAddForm(false);
      setIsSubmitting(false);
    }
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (!isPengurus) return;

    const remainingEntries = firestoreTestimonials
      .filter((item) => item.id !== testimonialId)
      .slice(0, 50);
    const remaining = remainingEntries.map(sanitizeForFirestore);

    setFirestoreTestimonials(remainingEntries);
    saveLocalBackup(remainingEntries);

    try {
      await setDoc(doc(db, BOARD_COLLECTION, BOARD_DOC_ID), {
        boardId: BOARD_DOC_ID,
        items: remaining,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      if (isPermissionDeniedError(error)) {
        handleFirestoreError(error, OperationType.UPDATE, BOARD_PATH);
      }
    }
  };

  return (
    <section id="testimoni" className="py-20 md:py-24 border-b border-[#E6E1D6] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#E6E1D6]">
          <div className="max-w-2xl">
            <p className="text-xs text-[#78716C] mb-3">
              Suara Murid, Wali Murid & Pengunjung · Tersimpan di Basis Data Sanggar
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] tracking-tight">
              Testimoni Murid, Wali Murid & Pengunjung
            </h2>
            <p className="mt-4 text-base text-[#57534E]">
              Bagikan pengalaman belajar, perkembangan kepercayaan diri anak, atau kesan Anda
              terhadap penampilan Sanggar Pitaloka Kusuma Putri. Setiap testimoni yang ditulis akan
              langsung ditampilkan di halaman ini.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start">
            <button
              type="button"
              onClick={() => {
                setShowAddForm((prev) => !prev);
                setSubmitSuccess(false);
              }}
              className="px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors whitespace-nowrap cursor-pointer"
            >
              {showAddForm ? 'Tutup Formulir Testimoni' : 'Tulis & Simpan Testimoni'}
            </button>

            {isPengurus ? (
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#9A3412] bg-[#F2EFE9] border border-[#9A3412]/30 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pengurus Aktif</span>
                </span>
                <button
                  type="button"
                  onClick={handlePengurusLogout}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#57534E] bg-[#F2EFE9] border border-[#D6CFC2] rounded-lg hover:text-[#1C1917] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Pengurus</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPengurusError('');
                  setShowPengurusModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#57534E] bg-[#F2EFE9] border border-[#D6CFC2] rounded-lg hover:text-[#1C1917] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login Pengurus</span>
              </button>
            )}
          </div>
        </div>

        {submitSuccess && (
          <div className="mt-6 p-4 rounded-xl bg-[#F2EFE9] border border-[#9A3412]/40 text-sm text-[#1C1917] flex items-center justify-between gap-4">
            <span>
              Terima kasih! Testimoni Anda telah berhasil disimpan dan ditampilkan di halaman ini.
            </span>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="text-xs font-semibold text-[#9A3412] hover:underline whitespace-nowrap cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Interactive Visitor Testimonial Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddTestimonial}
            className="mt-8 p-6 md:p-8 rounded-2xl bg-[#F2EFE9] border border-[#E6E1D6] space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E1D6] pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#1C1917]">
                  Formulir Testimoni Pengunjung & Anggota Sanggar
                </h3>
                <p className="text-xs text-[#57534E]">
                  Testimoni yang Anda kirimkan akan langsung tersimpan dan tampil di halaman ini.
                </p>
              </div>
            </div>

            {formError && (
              <p className="text-xs font-semibold text-[#9A3412]" role="alert">
                {formError}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="testi-name"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Nama Lengkap Anda *
                </label>
                <input
                  id="testi-name"
                  type="text"
                  maxLength={100}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Contoh: Raka Pratama / Ibu Dewi (Wali Murid)"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label
                  htmlFor="testi-role"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Status / Sekolah / Asal Pengunjung *
                </label>
                <input
                  id="testi-role"
                  type="text"
                  maxLength={120}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Wali Murid · Bandung"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label
                  htmlFor="testi-program"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Program Kelas atau Pertunjukan yang Diikuti
                </label>
                <select
                  id="testi-program"
                  value={programTaken}
                  onChange={(e) => setProgramTaken(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                >
                  {JADWAL_LATIHAN.map((item) => (
                    <option key={item.id} value={item.programName}>
                      {item.programName}
                    </option>
                  ))}
                  <option value="Penonton / Tamu Pertunjukan Sanggar">
                    Penonton / Tamu Pertunjukan Sanggar
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="testi-period"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Lama Bergabung / Waktu Kunjungan
                </label>
                <input
                  id="testi-period"
                  type="text"
                  maxLength={80}
                  value={joinPeriod}
                  onChange={(e) => setJoinPeriod(e.target.value)}
                  placeholder="Contoh: Bergabung selama 1 tahun / Pengunjung 2026"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="testi-quote"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                Kesan & Pengalaman Belajar di Sanggar Pitaloka Kusuma Putri *
              </label>
              <textarea
                id="testi-quote"
                rows={3}
                maxLength={1000}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Ceritakan pengalaman belajar, cara mengajar pelatih, atau kesan Anda terhadap penampilan sanggar (minimal 10 karakter)..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div>
              <label
                htmlFor="testi-outcome"
                className="block text-xs font-semibold text-[#1C1917] mb-1.5"
              >
                Hasil / Perubahan Positif yang Dirasakan *
              </label>
              <input
                id="testi-outcome"
                type="text"
                maxLength={200}
                value={outcomeHighlight}
                onChange={(e) => setOutcomeHighlight(e.target.value)}
                placeholder="Contoh: Anak semakin percaya diri tampil menari di panggung sekolah"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] disabled:opacity-60 transition-colors whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Testimoni'}
              </button>
            </div>
          </form>
        )}

        {loading && (
          <div className="mt-8 text-xs text-[#78716C] font-mono-tabular">
            Memuat data testimoni...
          </div>
        )}

        {/* Empty State when no testimonials have been written yet */}
        {!loading && firestoreTestimonials.length === 0 && (
          <div className="mt-12 p-8 sm:p-12 rounded-2xl bg-[#F2EFE9]/60 border border-[#E6E1D6] text-center max-w-2xl mx-auto space-y-4">
            <h3 className="font-display text-2xl font-bold text-[#1C1917]">
              Belum Ada Testimoni yang Ditulis
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Halaman testimoni saat ini masih kosong. Jadilah yang pertama membagikan pengalaman
              belajar menari atau kesan Anda terhadap penampilan Sanggar Pitaloka Kusuma Putri.
            </p>
            {!showAddForm && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="px-5 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors cursor-pointer"
                >
                  Tulis Testimoni Pertama
                </button>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Grid (Only newly submitted testimonials) */}
        {firestoreTestimonials.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {firestoreTestimonials.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#F2EFE9]/70 border border-[#E6E1D6] flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    {/* Unboxed metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
                      <span>{item.programTaken}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.joinPeriod}</span>
                    </div>

                    {isPengurus && (
                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(item.id)}
                        aria-label={`Hapus testimoni ${item.studentName}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A3412] hover:underline shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>

                  <blockquote className="text-base text-[#1C1917] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-5 border-t border-[#E6E1D6] space-y-3">
                  <div className="text-xs text-[#9A3412] font-semibold">
                    Capaian: {item.outcomeHighlight}
                  </div>

                  <div>
                    <div className="font-display text-xl font-bold text-[#1C1917]">
                      {item.studentName}
                    </div>
                    <div className="text-xs text-[#57534E] mt-0.5">{item.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal Login Pengurus */}
      {showPengurusModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pengurus-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md bg-[#FAF8F5] rounded-2xl border border-[#E6E1D6] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-1.5">
              <p className="text-xs text-[#9A3412] font-semibold">Akses Khusus Pengurus Sanggar</p>
              <h3
                id="pengurus-modal-title"
                className="font-display text-2xl font-bold text-[#1C1917]"
              >
                Login Pengurus Sanggar
              </h3>
              <p className="text-xs text-[#57534E]">
                Hanya pengurus yang telah login yang dapat mengelola atau menghapus testimoni
                pengunjung.
              </p>
            </div>

            {pengurusError && (
              <p className="text-xs font-semibold text-[#9A3412]" role="alert">
                {pengurusError}
              </p>
            )}

            <form onSubmit={handlePengurusCodeLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="pengurus-user"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Username / Email Pengurus
                </label>
                <input
                  id="pengurus-user"
                  type="text"
                  value={pengurusUsername}
                  onChange={(e) => setPengurusUsername(e.target.value)}
                  placeholder="Ketik: pengurus"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F2EFE9] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div>
                <label
                  htmlFor="pengurus-pass"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Kode Akses / Kata Sandi Pengurus
                </label>
                <input
                  id="pengurus-pass"
                  type="password"
                  value={pengurusPassword}
                  onChange={(e) => setPengurusPassword(e.target.value)}
                  placeholder="Masukkan kode akses pengurus"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F2EFE9] border border-[#D6CFC2] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPengurusModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#9A3412] rounded-lg hover:bg-[#7C2D12] transition-colors cursor-pointer"
                >
                  Masuk sebagai Pengurus
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-[#E6E1D6] flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#1C1917] bg-[#F2EFE9] border border-[#D6CFC2] rounded-lg hover:bg-[#E6E1D6]/60 transition-colors cursor-pointer"
              >
                Atau Masuk dengan Google Pengurus
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
