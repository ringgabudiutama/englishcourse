export const KATEGORI_PRODUK = [
  "Speaking",
  "Listening",
  "Vocabulary",
  "Grammar",
  "Writing",
  "Reading",
  "Conversation",
  "TOEFL / IELTS Preparation",
  "Business English",
  "English for Kids",
] as const;

export const LEVEL_LABEL: Record<string, string> = {
  PEMULA: "Pemula",
  MENENGAH: "Menengah",
  MAHIR: "Mahir",
  SEMUA_LEVEL: "Semua Level",
};

export const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft",
  PUBLISH: "Publish",
};
