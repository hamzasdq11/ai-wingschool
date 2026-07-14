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

export const registerWhatsappUrl = whatsappUrl(
  "Hi Wingschool! I'd like to register for WingsQuest 2026.",
);

// Swap for the registration form URL once it exists.
export const registerMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "WingsQuest 2026 Application",
)}&body=${encodeURIComponent(
  "Student name:\nClass (6–10):\nSchool:\nCity:\nParent's phone:\n",
)}`;
