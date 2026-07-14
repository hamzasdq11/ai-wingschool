export const CONTACT_EMAIL = "connect@aiwingschool.com";
export const CONTACT_PHONE_DISPLAY = "+91 7355080850";
export const CONTACT_PHONE_TEL = "+917355080850";

const WHATSAPP_NUMBER = "917355080850";

export function whatsappUrl(text?: string) {
  return text
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
}

export const WHATSAPP_URL = whatsappUrl();

export type WingsQuestApplication = {
  student: string;
  grade: string;
  school: string;
  board: string;
  city: string;
  email: string;
  phone?: string;
};

function applicationLines(app: WingsQuestApplication) {
  return [
    `Student: ${app.student}`,
    `Class: ${app.grade}`,
    `School: ${app.school}`,
    `Board: ${app.board}`,
    `City: ${app.city}`,
    `Parent's email: ${app.email}`,
    ...(app.phone ? [`Parent's WhatsApp: ${app.phone}`] : []),
  ];
}

export function applicationMailto(app: WingsQuestApplication) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "WingsQuest 2026 Application",
  )}&body=${encodeURIComponent(applicationLines(app).join("\n"))}`;
}
