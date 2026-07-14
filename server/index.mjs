import express from "express";
import { access, appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR ?? path.join(__dirname, "data");
const DIST_DIR = path.join(__dirname, "..", "dist");
const PORT = Number(process.env.PORT ?? 8787);

const app = express();
app.use(express.json({ limit: "10kb" }));

// Quote every field; double inner quotes; neutralize spreadsheet
// formula injection (leading = + - @ or tab/CR).
function csvField(value) {
  let s = String(value ?? "").trim();
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replaceAll('"', '""')}"`;
}

async function appendRow(file, header, values) {
  await mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, file);
  let exists = true;
  try {
    await access(filePath);
  } catch {
    exists = false;
  }
  const line = `${values.map(csvField).join(",")}\n`;
  await appendFile(filePath, exists ? line : `${header}\n${line}`, "utf8");
}

const text = (v, max = 120) =>
  typeof v === "string" && v.trim().length > 0 && v.trim().length <= max;
const phone = (v) => typeof v === "string" && /^\+?[0-9\s\-]{10,15}$/.test(v.trim());
const gradeIn = (v, allowed) => allowed.includes(String(v));

app.post("/api/demo", async (req, res) => {
  const { name, phone: phoneNo, grade } = req.body ?? {};
  if (!text(name) || !phone(phoneNo) || !gradeIn(grade, ["5", "6", "7", "8", "9", "10"])) {
    return res.status(400).json({ error: "Invalid or missing fields: name, phone, grade (5-10)." });
  }
  try {
    await appendRow(
      "demo-requests.csv",
      "timestamp,name,whatsapp,class",
      [new Date().toISOString(), name, phoneNo, grade],
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("demo write failed:", err);
    res.status(500).json({ error: "Could not save your request." });
  }
});

// 10-digit Indian mobile, spaces/dashes tolerated, optional +91 prefix.
const indianMobile = (v) => {
  if (typeof v !== "string") return null;
  const digits = v.replace(/[\s\-]/g, "").replace(/^\+91/, "");
  return /^[6-9][0-9]{9}$/.test(digits) ? digits : null;
};

app.post("/api/register", async (req, res) => {
  const { student, grade, school, city, phone: phoneNo, interest } = req.body ?? {};
  const mobile = indianMobile(phoneNo);
  const interestOk =
    interest === undefined || (typeof interest === "string" && interest.trim().length <= 220);
  if (
    !text(student) ||
    !gradeIn(grade, ["6", "7", "8", "9", "10"]) ||
    !text(school) ||
    !text(city, 80) ||
    !mobile ||
    !interestOk
  ) {
    return res.status(400).json({
      error:
        "Invalid or missing fields: student, grade (6-10), school, city, phone (10-digit Indian mobile).",
    });
  }
  try {
    await appendRow(
      "registrations.csv",
      "timestamp,student,class,school,city,parent_whatsapp,interest",
      [new Date().toISOString(), student, grade, school, city, mobile, interest ?? ""],
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("registration write failed:", err);
    res.status(500).json({ error: "Could not save your application." });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Production: serve the built site with SPA fallback.
app.use(express.static(DIST_DIR));
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`wingschool server on http://localhost:${PORT} (data: ${DATA_DIR})`);
});
