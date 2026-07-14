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
  city: string;
  phone: string;
};

function applicationLines(app: WingsQuestApplication) {
  return [
    `Student: ${app.student}`,
    `Class: ${app.grade}`,
    `School: ${app.school}`,
    `City: ${app.city}`,
    `Parent's WhatsApp: ${app.phone}`,
  ];
}

export function applicationWhatsappUrl(app: WingsQuestApplication) {
  return whatsappUrl(
    ["Hi Wingschool! I'd like to apply for WingsQuest 2026.", ...applicationLines(app)].join(
      "\n",
    ),
  );
}
