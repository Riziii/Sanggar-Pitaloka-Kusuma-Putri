const SANGGAR_PHOTO_URL =
  'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_475001185_17917467105043941_9177024738413660217_n.jpg';

export const SANGGAR_INFO = {
  name: 'SANGGAR PITALOKA KUSUMA PUTRI',
  shortName: 'Sanggar Pitaloka Kusuma Putri',
  tagline: 'Pelestarian & Pembinaan Seni Tari Tradisional Sunda dan Nusantara di Kota Bandung',
  whatsappDisplay: '0858-7194-9535',
  whatsappRaw: '085871949535',
  whatsappNumber: '6285871949535',
  instagramUrl:
    'https://www.instagram.com/_sanggarpkp?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
  instagramHandle: '@_sanggarpkp',
  tiktokUrl: 'https://www.tiktok.com/@_sanggarpkp?is_from_webapp=1&sender_device=pc',
  tiktokHandle: '@_sanggarpkp',
  address:
    'Jl. Babakan Baru Gg. Aster No.04, Kel. Sukapada, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat',
  shortAddress: 'Jl. Babakan Baru Gg. Aster No.04, Sukapada, Cibeunying Kidul, Bandung',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Jl.+Babakan+Baru+Gg.+Aster+No.04,+Sukapada,+Cibeunying+Kidul,+Kota+Bandung,+Jawa+Barat&t=&z=16&ie=UTF8&iwloc=&output=embed',
  googleMapsDirectUrl:
    'https://www.google.com/maps/search/?api=1&query=Jl.+Babakan+Baru+Gg.+Aster+No.04,+Kel.+Sukapada,+Kec.+Cibeunying+Kidul,+Kota+Bandung,+Jawa+Barat',
  heroImage:
    'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_783255386_17986318317043941_745772693864414650_n.jpg',
};

export interface ScheduleItem {
  id: string;
  indexNumber: string;
  programName: string;
  category: 'Anak' | 'Remaja & Dewasa' | 'Klasik & Prestasi' | 'Privat';
  ageGroup: string;
  level: string;
  days: string;
  timeRange: string;
  duration: string;
  curriculumFocus: string[];
  quotaStatus: string;
}

export const JADWAL_LATIHAN: ScheduleItem[] = [
  {
    id: 'dasar-anak',
    indexNumber: '01',
    programName: 'Kelas Dasar Tari Anak (Sekar Alit)',
    category: 'Anak',
    ageGroup: 'Usia 5–10 Tahun',
    level: 'Pemula Dasar',
    days: 'Sabtu & Minggu',
    timeRange: 'Mulai 19.00 – 20.30 WIB',
    duration: '90 Menit / Sesi',
    curriculumFocus: [
      'Wiraga dasar: olah tubuh, kelenturan tangan (ukel), dan ketukan gamelan',
      'Tari Kijang, Tari Kupu-Kupu, dan Tari Kelinci Kreasi Sunda',
      'Melatih keberanian tampil di panggung dan disiplin gerak bersama',
    ],
    quotaStatus: 'Tersedia 6 kursi periode ini',
  },
  {
    id: 'jaipong-remaja',
    indexNumber: '02',
    programName: 'Kelas Jaipong Kreasi & Mojang Priangan',
    category: 'Remaja & Dewasa',
    ageGroup: 'Usia 11–22 Tahun',
    level: 'Menengah',
    days: 'Rabu & Sabtu',
    timeRange: 'Mulai 19.00 – 21.00 WIB',
    duration: '120 Menit / Sesi',
    curriculumFocus: [
      'Teknik Bukaan, Pencugan, Nibakeun, dan Mincid khas Jaipongan Bandung',
      'Repertoar Tari Kembang Tanjung, Senggot, dan Mojang Priangan',
      'Penguasaan ekspresi (Wirasa) dan dinamika kendang (Wirama)',
    ],
    quotaStatus: 'Tersedia 5 kursi periode ini',
  },
  {
    id: 'klasik-merak',
    indexNumber: '03',
    programName: 'Kelas Tari Klasik Sunda & Tari Merak',
    category: 'Klasik & Prestasi',
    ageGroup: 'Usia 12 Tahun ke Atas',
    level: 'Lanjutan & Pentas',
    days: 'Jumat & Minggu',
    timeRange: 'Mulai 19.00 – 21.00 WIB',
    duration: '120 Menit / Sesi',
    curriculumFocus: [
      'Tari Merak Pasundan, Tari Dewi Anjasmara, dan Tari Topeng Priangan',
      'Teknik permainan selendang (sampur) sayap merak dan tata rias panggung',
      'Persiapan delegasi festival budaya, pasanggiri tari, dan penyambutan tamu',
    ],
    quotaStatus: 'Tersedia 4 kursi periode ini',
  },
  {
    id: 'privat-intensif',
    indexNumber: '04',
    programName: 'Kelas Privat & Persiapan Ujian / Lomba',
    category: 'Privat',
    ageGroup: 'Semua Usia (SD, SMP, SMA, Mahasiswa, Umum)',
    level: 'Kurikulum Khusus',
    days: 'Selasa & Kamis (Fleksibel)',
    timeRange: 'Mulai 19.00 – 21.00 WIB',
    duration: '120 Menit / Sesi',
    curriculumFocus: [
      'Pendampingan intensif 1-on-1 atau kelompok kecil untuk FLS2N & Pasanggiri',
      'Persiapan ujian praktik seni budaya sekolah atau seleksi jurusan seni',
      'Koreografi khusus acara adat mapag panganten & pagelaran instansi',
    ],
    quotaStatus: 'Jadwal fleksibel sesuai kesepakatan',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Pertunjukan' | 'Latihan Rutin' | 'Klasik & Busana' | 'Pembinaan Anak';
  eventDate: string;
  location: string;
  image: string;
  description: string;
  dancersCount: string;
}

export const GALERI_FOTO: GalleryItem[] = [
  {
    id: 'galeri-1',
    title: 'Gelar Karya Senja Pasundan: Harmoni Jaipong & Klasik',
    category: 'Pertunjukan',
    eventDate: 'Agustus 2026',
    location: 'Gedung Kesenian Rumentang Siang, Bandung',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_475001185_17917467105043941_9177024738413660217_n.jpg',
    description:
      'Penampilan kolaborasi penari utama Sanggar Pitaloka Kusuma Putri membawakan repertoar Jaipong Klasik dengan tata cahaya panggung keemasan dan iringan gamelan salendro langsung.',
    dancersCount: 'Penari Inti Sanggar',
  },
  {
    id: 'galeri-2',
    title: 'Pesona Tari Merak Jawa Barat pada Festival Budaya Priangan',
    category: 'Klasik & Busana',
    eventDate: 'Juli 2026',
    location: 'Taman Budaya Jawa Barat (Dago Tea House)',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_475033867_17917466814043941_8083692884277716546_n.jpg',
    description:
      'Keindahan bentangan selendang dan busana tari tradisional Sunda yang dibawakan secara serempak oleh tim prestasi Sanggar Pitaloka Kusuma Putri.',
    dancersCount: 'Tim Prestasi',
  },
  {
    id: 'galeri-3',
    title: 'Sesi Olah Wiraga & Teknik Sampur Kelas Jaipong Remaja',
    category: 'Latihan Rutin',
    eventDate: 'September 2026',
    location: 'Studio Utama Gg. Aster No.04, Cibeunying Kidul',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_479484902_17919788442043941_1598938438262474912_n.jpg',
    description:
      'Latihan rutin memfokuskan ketepatan aksen tangan (ukel), perpindahan tumpuan kaki, serta ketajaman ekspresi sesuai pakem tari tradisi Sunda.',
    dancersCount: 'Kelas Remaja',
  },
  {
    id: 'galeri-4',
    title: 'Anggunnya Siger & Busana Tari Klasik Keraton Priangan',
    category: 'Klasik & Busana',
    eventDate: 'Mei 2026',
    location: 'Pendopo Kota Bandung',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_479495316_17919788679043941_5922736029193218342_n.jpg',
    description:
      'Dokumentasi detail tata busana siger emas, apok bordir, dan sinjang lereng yang dikenakan penari saat penyambutan tamu kehormatan.',
    dancersCount: 'Penari Senior',
  },
  {
    id: 'galeri-5',
    title: 'Pembinaan Karakter & Gerak Dasar Kelas Anak (Sekar Alit)',
    category: 'Pembinaan Anak',
    eventDate: 'September 2026',
    location: 'Studio Sanggar Pitaloka Kusuma Putri, Sukapada',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_504579651_17932793208043941_8107818745750146437_n.jpg',
    description:
      'Pendekatan belajar yang hangat dan menyenangkan bagi anak usia dini untuk mengenal ketukan gamelan, kelenturan tubuh, dan rasa cinta budaya lokal sejak kecil.',
    dancersCount: 'Kelas Sekar Alit',
  },
  {
    id: 'galeri-6',
    title: 'Pentas Apresiasi Seni & Pasanggiri Tari Kreasi Pasundan',
    category: 'Pertunjukan',
    eventDate: 'Juni 2026',
    location: 'Kota Bandung, Jawa Barat',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_538397704_17941288284043941_4103760496665185312_n.jpg',
    description:
      'Penampilan penuh semangat dari para penari Sanggar Pitaloka Kusuma Putri dalam ajang apresiasi budaya dan pasanggiri tari tingkat Kota Bandung.',
    dancersCount: 'Delegasi Pasanggiri',
  },
  {
    id: 'galeri-7',
    title: 'Kekompakan Formasi Panggung Tari Tradisional Nusantara',
    category: 'Pertunjukan',
    eventDate: 'Juni 2026',
    location: 'Gedung Kesenian Bandung',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_539463078_17941288302043941_7910720759618239066_n.jpg',
    description:
      'Keselarasan gerak wiraga dan wirama dalam formasi kelompok yang menampilkan keanggunan koreografi khas Sanggar Pitaloka Kusuma Putri.',
    dancersCount: 'Formasi Kelompok',
  },
  {
    id: 'galeri-8',
    title: 'Eksplorasi Gerak & Wirasa Penari Muda Bandung',
    category: 'Latihan Rutin',
    eventDate: 'Juli 2026',
    location: 'Jl. Babakan Baru Gg. Aster No.04, Sukapada',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_562069867_17946506037043941_44544290636926624_n.jpg',
    description:
      'Pendalaman penghayatan tarian (wirasa) dan ketahanan fisik penari sebelum tampil pada pagelaran seni budaya daerah.',
    dancersCount: 'Anggota Aktif',
  },
  {
    id: 'galeri-9',
    title: 'Kemilau Tata Rias & Kostum Pentas Adat Sunda',
    category: 'Klasik & Busana',
    eventDate: 'Agustus 2026',
    location: 'Kota Bandung, Jawa Barat',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_598717730_17952973095043941_3121843620587520532_n.jpg',
    description:
      'Kesiapan tata rias panggung dan kelengkapan busana adat Sunda yang memancarkan wibawa serta kehalusan seni tradisi.',
    dancersCount: 'Tim Pentas Adat',
  },
  {
    id: 'galeri-10',
    title: 'Generasi Penerus Seni Tari di Sanggar Pitaloka Kusuma Putri',
    category: 'Pembinaan Anak',
    eventDate: 'Agustus 2026',
    location: 'Cibeunying Kidul, Kota Bandung',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_612975611_17956368753043941_8033528575232443512_n.jpg',
    description:
      'Momen kebersamaan dan rasa percaya diri murid-murid anak setelah menyelesaikan evaluasi gerak dasar dan koreografi panggung.',
    dancersCount: 'Murid Anak & Remaja',
  },
  {
    id: 'galeri-11',
    title: 'Dinamika Jaipong Kreasi pada Pagelaran Seni Kota Bandung',
    category: 'Pertunjukan',
    eventDate: 'Agustus 2026',
    location: 'Panggung Budaya Bandung',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_618844578_17946742359093627_1783320974446029014_n.jpg',
    description:
      'Ketegasan gerak bukaan dan pencugan dalam pementasan Jaipong Kreasi yang memukau penonton di Kota Bandung.',
    dancersCount: 'Penari Jaipong',
  },
  {
    id: 'galeri-12',
    title: 'Harmoni Busana Tradisional & Keanggunan Sikap Penari',
    category: 'Klasik & Busana',
    eventDate: 'September 2026',
    location: 'Kota Bandung, Jawa Barat',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_619467491_17925262044207421_4255583039910823308_n.jpg',
    description:
      'Perpaduan warna busana tari tradisional dengan sikap tubuh yang luwes mencerminkan dedikasi latihan di Sanggar Pitaloka Kusuma Putri.',
    dancersCount: 'Penari Klasik',
  },
  {
    id: 'galeri-13',
    title: 'Persiapan & Evaluasi Koreografi Menjelang Pentas',
    category: 'Latihan Rutin',
    eventDate: 'September 2026',
    location: 'Studio Gg. Aster No.04, Sukapada',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_623516437_18080627687236069_3728680721973610106_n.jpg',
    description:
      'Pendampingan intensif pelatih dalam menyempurnakan detail transisi pola lantai dan keserempakan gerak seluruh anggota tim.',
    dancersCount: 'Tim Persiapan Pentas',
  },
  {
    id: 'galeri-14',
    title: 'Keceriaan & Keberanian Tampil Penari Cilik Pasundan',
    category: 'Pembinaan Anak',
    eventDate: 'September 2026',
    location: 'Kota Bandung, Jawa Barat',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_624118198_18087520820325043_4850434686893640240_n.jpg',
    description:
      'Senyum bangga para penari cilik Sanggar Pitaloka Kusuma Putri saat tampil membawakan tarian kreasi anak di atas panggung.',
    dancersCount: 'Penari Cilik',
  },
  {
    id: 'galeri-15',
    title: 'Persembahan Tari Penyambutan & Upacara Adat Sunda',
    category: 'Pertunjukan',
    eventDate: 'September 2026',
    location: 'Kota Bandung, Jawa Barat',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_649669357_17940928104153373_5258068501863210509_n.jpg',
    description:
      'Penampilan khidmat dan anggun tim penari sanggar dalam acara penyambutan tamu kehormatan serta perhelatan budaya di Bandung.',
    dancersCount: 'Tim Mapag & Adat',
  },
  {
    id: 'galeri-16',
    title: 'Dedikasi Pelestarian Budaya Sunda Lintas Generasi',
    category: 'Latihan Rutin',
    eventDate: 'September 2026',
    location: 'Sanggar Pitaloka Kusuma Putri, Bandung',
    image:
      'https://ihqoctaqlxqtzxcriltf.supabase.co/storage/v1/object/public/Sanggar%20Pitaloka/SaveClip.App_654955386_18078184412411689_6014337596989073823_n.jpg',
    description:
      'Kebersamaan keluarga besar Sanggar Pitaloka Kusuma Putri dalam merawat warisan seni tari tradisional Sunda dan Nusantara.',
    dancersCount: 'Keluarga Besar Sanggar',
  },
];

export interface TestimonialItem {
  id: string;
  studentName: string;
  role: string;
  programTaken: string;
  joinPeriod: string;
  quote: string;
  outcomeHighlight: string;
}

export const DAFTAR_TESTIMONI: TestimonialItem[] = [];

export interface FaqItem {
  question: string;
  answer: string;
}

export const DAFTAR_FAQ: FaqItem[] = [
  {
    question: 'Apakah pemula yang belum pernah menari sama sekali bisa mendaftar?',
    answer:
      'Sangat bisa. Setiap murid baru akan ditempatkan sesuai kelompok usia dan penguasaan dasar. Di bulan pertama, pelatih memfokuskan pada pengenalan ketukan irama, kelenturan dasar, dan gerak tangan (ukel) secara bertahap.',
  },
  {
    question: 'Perlengkapan apa saja yang perlu dibawa saat latihan perdana?',
    answer:
      'Murid cukup mengenakan pakaian olahraga atau kaos yang nyaman menyerap keringat, celana panjang/legging, serta membawa selendang latihan (sampur) dan air minum. Jika belum memiliki sampur, sanggar menyediakan pinjaman pada sesi perdana.',
  },
  {
    question: 'Bagaimana alur pendaftaran anggota baru di website ini?',
    answer:
      'Anda cukup mengisi Formulir Pendaftaran Anggota Baru di halaman ini, lalu klik tombol kirim. Sistem akan otomatis menyusun format data lengkap Anda dan mengarahkannya langsung ke WhatsApp resmi pengurus sanggar (0858-7194-9535) untuk konfirmasi jadwal.',
  },
  {
    question: 'Apakah sanggar menerima undangan tampil acara adat atau penyambutan tamu?',
    answer:
      'Ya, Sanggar Pitaloka Kusuma Putri melayani permintaan pertunjukan Tari Merak, Jaipongan, Tari Klasik, hingga upacara adat Mapag Panganten untuk pernikahan, acara sekolah, maupun instansi di wilayah Bandung dan Jawa Barat.',
  },
];
