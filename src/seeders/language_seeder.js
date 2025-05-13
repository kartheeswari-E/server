import Language from "../data/models/language.js";

const data = [
  { id: 1, code: "ar", name: "العربية" },
  { id: 2, code: "ca", name: "Català" },
  { id: 3, code: "da", name: "Dansk" },
  { id: 4, code: "de", name: "Deutsche" },
  { id: 5, code: "en", name: "English" },
  { id: 6, code: "el", name: "Eλληνικά" },
  { id: 7, code: "es", name: "Español" },
  { id: 8, code: "fa", name: "فارسی" },
  { id: 9, code: "fi", name: "Suomi" },
  { id: 10, code: "fr", name: "Français" },
  { id: 11, code: "hi", name: "हिन्दी" },
  { id: 12, code: "hu", name: "Hungarian" },
  { id: 13, code: "id", name: "bahasa Indonesia" },
  { id: 14, code: "it", name: "Italiana" },
  { id: 15, code: "ja", name: "日本語" },
  { id: 16, code: "ko", name: "한국어" },
  { id: 17, code: "ms", name: "Melayu" },
  { id: 18, code: "nl", name: "Nederlands" },
  { id: 19, code: "pl", name: "Polskie" },
  { id: 20, code: "pt", name: "Português" },
  { id: 21, code: "ru", name: "русский" },
  { id: 22, code: "ta", name: "தமிழ்" },
  { id: 23, code: "th", name: "ภาษาไทย" },
  { id: 24, code: "tr", name: "Türkçe" },
  { id: 25, code: "zh", name: "中文" },
];

export default async () => {
  try {
    console.log("Running Language Seeder");

    await Language.deleteMany({});

    data.forEach(async (item) => {
      await Language.create(item);
    });
  } catch (error) {
    console.error("Language Seeding failed:", error);
  }
};
