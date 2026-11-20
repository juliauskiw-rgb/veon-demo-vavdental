// Content of the VAV Dental homepage. Every value comes from veon/client.json (fact ids in comments);
// nothing here is invented. Photos are the clinic's own materials, processed into src/assets/img.
import type { ImageMetadata } from "astro";
import veklyak from "../assets/img/doctor-veklyak.webp";
import babyakKh from "../assets/img/doctor-babyak-khrystyna.webp";
import marych from "../assets/img/doctor-marych.webp";
import kushynskyj from "../assets/img/doctor-kushynskyj.webp";
import mykyrtychyan from "../assets/img/doctor-mykyrtychyan.webp";
import leshchenko from "../assets/img/doctor-leshchenko.webp";
import petrichenko from "../assets/img/doctor-petrichenko.webp";
import babyakM from "../assets/img/doctor-babyak-maksym.webp";
import kretsul from "../assets/img/doctor-kretsul.webp";

export const NOTE = "Розділ у розробці";

// C-020, company.contacts.phones
export const phones = {
  main: { text: "063 620 40 87", full: "+38 063 620 40 87", href: "tel:+380636204087" },
  second: { text: "098 668 28 25", full: "+38 098 668 28 25", href: "tel:+380986682825" },
};

// company.contacts.messengers (exact links from client.json)
export const messengers = [
  { id: "telegram", label: "Telegram", href: "https://t.me/Vavdentalclinic" },
  { id: "viber", label: "Viber", href: "viber://chat?number=%2B380636204087" },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/380636204087" },
] as const;

export const whatsappWith = (text: string) => `https://wa.me/380636204087?text=${encodeURIComponent(text)}`;

// C-001, company.contacts.addresses[0]
export const address = {
  street: "вул. Дністерська, 16а",
  short: "Дністерська, 16а",
  city: "Львів",
  district: "Сихівський район",
  hours: "Пн–Пт 09:00–19:00",
  map: "https://maps.app.goo.gl/PVApuLSbEyKayViP6",
};

// socials[] with status confirmed
export const socials = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/vav_dental_clinic" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/vavdental" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@vav_dental_clinic" },
] as const;

// C-002
export const legal = { operator: "ФОП Векляк А.В.", license: "Ліцензія МОЗ № 239/Л-П від 17.01.20" };

export interface Person {
  id: string;
  name: string;
  short: string;
  role: string;
  years?: string;
  photo: ImageMetadata;
}

// C-007 (roles and experience as published on the clinic's homepage)
export const people: Record<string, Person> = {
  veklyak: { id: "veklyak", name: "Векляк Анатолій Володимирович", short: "Анатолій Векляк", role: "Головний лікар, хірург та ортопед", years: "18 років", photo: veklyak },
  babyakKh: { id: "babyak-khrystyna", name: "Баб'як Христина Валеріївна", short: "Христина Баб'як", role: "Стоматолог-гігієніст", years: "15 років", photo: babyakKh },
  marych: { id: "marych", name: "Марич Марія Василівна", short: "Марія Марич", role: "Лікар-терапевт", years: "10 років", photo: marych },
  kushynskyj: { id: "kushynskyj", name: "Кушинський Дмитро Ростиславович", short: "Дмитро Кушинський", role: "Лікар-ендодонтист", years: "8 років", photo: kushynskyj },
  mykyrtychyan: { id: "mykyrtychyan", name: "Микиртичян Марта Олексіївна", short: "Марта Микиртичян", role: "Ортодонт", years: "12 років", photo: mykyrtychyan },
  leshchenko: { id: "leshchenko", name: "Лещенко Северин Кирилович", short: "Северин Лещенко", role: "Пародонтолог", years: "2 роки", photo: leshchenko },
  petrichenko: { id: "petrichenko", name: "Петріченко Вадим Анатолійович", short: "Вадим Петріченко", role: "Молодший спеціаліст, ендодонтист", photo: petrichenko },
  babyakM: { id: "babyak-maksym", name: "Баб'як Максим Віталійович", short: "Максим Баб'як", role: "Молодший спеціаліст, ортопед", photo: babyakM },
  kretsul: { id: "kretsul", name: "Крецул Ольга Іванівна", short: "Ольга Крецул", role: "Рентгенлаборант", photo: kretsul },
};

export const doctorsStrip: Person[] = [
  people.veklyak, people.babyakKh, people.marych, people.kushynskyj,
  people.mykyrtychyan, people.leshchenko, people.petrichenko, people.babyakM,
];

export interface Direction {
  id: string;
  name: string;
  services: string[];
  people: { person: Person; for?: string }[];
}

// company.business_lines + company.products_services (C-004).
// A person is attached only where C-007 names that specialisation directly; otherwise the row has no name.
export const directions: Direction[] = [
  { id: "likuvannya", name: "Лікування (терапія)", services: ["Пломбування зубів", "Лікування карієсу"], people: [{ person: people.marych }] },
  { id: "ortopediya", name: "Ортопедія", services: ["Коронки на імплантатах", "Коронки на зуб", "Знімні зубні протези"], people: [{ person: people.veklyak }, { person: people.babyakM }] },
  { id: "hirurgiya", name: "Хірургія", services: ["Пластика вуздечки язика", "Пластика вуздечки верхньої губи", "Видалення зубів", "Видалення зуба мудрості"], people: [{ person: people.veklyak }] },
  { id: "implantacziya", name: "Імплантація", services: ["Синус-ліфтинг", "Встановлення імплантата", "Остеопластика"], people: [] },
  { id: "ortodontiya", name: "Ортодонтія", services: ["Ортодонтичні мікроімпланти", "Елайнери", "Встановлення брекет-систем"], people: [{ person: people.mykyrtychyan }] },
  { id: "estetychna", name: "Естетична стоматологія", services: ["Реставрація зубів", "Вініри", "Відбілювання зубів системою Fläsh"], people: [] },
  { id: "diagnostyka", name: "Рентген діагностика", services: ["Прицільний рентген зубів", "Панорамний знімок зубів", "Комп'ютерна томографія"], people: [{ person: people.kretsul }] },
  { id: "dytyacha", name: "Дитяча стоматологія", services: ["Лікування пульпіту молочних зубів", "Лікування карієсу молочних зубів", "Видалення молочних зубів"], people: [] },
  { id: "endodontiya", name: "Ендодонтія", services: ["Видалення чужорідного тіла з каналу зуба", "Первинна та повторна ендодонтія під мікроскопом"], people: [{ person: people.kushynskyj }, { person: people.petrichenko }] },
  { id: "parodontologiya", name: "Пародонтологія", services: ["Хірургічна пародонтологія", "Складання періокарти", "Професійна гігієна"], people: [{ person: people.leshchenko }, { person: people.babyakKh, for: "професійна гігієна" }] },
];

// C-005 (only positions with a currency; Fläsh is left out, C-006)
export const prices = [
  { name: "Імплантація Straumann", value: "750", unit: "€", lead: true },
  { name: "Імплантація Neodent", value: "450", unit: "€" },
  { name: "КТ обох щелеп", value: "900", unit: "грн" },
  { name: "Консультація ортодонта", value: "600", unit: "грн" },
];

// C-008
export const equipment = [
  { name: "Дентальний мікроскоп", detail: "збільшення від 30×" },
  { name: "Комп'ютерний томограф", detail: "КТ у клініці" },
  { name: "Інтраоральний сканер", detail: "3Shape" },
  { name: "Візіограф", detail: "Sirona" },
  { name: "Рентген", detail: "Prox" },
  { name: "Ультразвук", detail: "Acteon" },
  { name: "Лампа для відбілювання", detail: "Fläsh" },
  { name: "3D-принтер", detail: "Phrozen Sonic Mini 8K" },
];

// C-009 (the "5+ years" claim is left out: it contradicts C-007)
export const safety = ["5 рівнів стерилізації.", "Місцева анестезія за замовчуванням.", "Седація за показаннями."];

// Verbatim from the reviews block of the clinic's homepage (C-012), names as published there.
export const reviews = [
  { author: "Anna Mykhailova", text: "З самих Винник їхала саме сюди. Прекрасно зробили чистку зубів, безкоштовно проконсультували по всіх зубах, без впарювань та із турботою. Єдина стоматологія, в якій мені було максимально комфортно та ще й як бонус хороший настрій))" },
  { author: "Анастасія Полапа", text: "Робила видалення 8-ок та імплантацію 6-ок. Все ідеально. Записалась сама, записала дитину. І всім рекомендую." },
  { author: "Halyna Mosakova", text: "Безсумнівно найкраща стоматологія! Дуже вдячна за професіоналізм та сервіс високого рівня, лікарі тут не лише найкращі спеціалісти, а й неймовірно приємні та позитивні люди. Все роблять якісно, безболісно та в комфорті. Довіряю свою усмішку тільки їм." },
];

export const nav = [
  { href: "#poslugy", label: "Послуги" },
  { href: "#akcziya", label: "Акція" },
  { href: "#cziny", label: "Ціни" },
  { href: "#likari", label: "Лікарі", rec: "R-005" },
  { href: "#kontakty", label: "Контакти" },
];
