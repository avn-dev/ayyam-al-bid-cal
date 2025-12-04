// ============================================================================
//  FULL HIJRI ↔ GREGORIAN KONVERTER (Tabular Islamic Calendar)
//  Fehlerfrei, mathematisch stabil, invertierbar
//  Weiße Tage (13–15) IMMER korrekt
// ============================================================================

// Julianisches Datum des Hijri-Epoch (Islamischer Kalenderbeginn)
// Hijri 1.1.1 entspricht 16. Juli 622 (Julian Day 1948439.5)
const HIJRI_EPOCH = 1948439.5;

export interface HijriDate {
  year: number;
  month: number; // 1–12
  day: number;   // 1–29/30
}

export interface GregorianDate {
  year: number;
  month: number; // 1–12
  day: number;   // 1–31
}

// ============================================================================
// GREGORIAN → JULIAN DAY
// ============================================================================
function gregorianToJD(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

// ============================================================================
// JULIAN DAY → GREGORIAN
// ============================================================================
function jdToGregorian(jd: number): GregorianDate {
  // Julian days beginnen mittags – durch das Aufrunden auf den nächsten
  // ganzen Tag (jd + 0,5) werden Off-by-One-Fehler beim Hin- und
  // Herkonvertieren vermieden. Ohne diesen Schritt landen die weißen Tage
  // fälschlicherweise bei 12–14 statt 13–15 Hijri.
  const wjd = Math.floor(jd + 0.5);

  const a = wjd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);

  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);

  return { year, month, day };
}

// ============================================================================
// HIJRI SCHALTJAHRE (Tabular Islamic Calendar, 30-Jahres-Zyklus)
// ============================================================================
const LEAP_YEARS = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];

function isHijriLeapYear(year: number): boolean {
  const cycleYear = ((year - 1) % 30) + 1;
  return LEAP_YEARS.includes(cycleYear);
}

// ============================================================================
// HIJRI MONATSLÄNGEN (Tabular: 30,29,30,29,... außer Monat 12 bei Schaltjahr)
// ============================================================================
function hijriMonthLength(year: number, month: number): number {
  if (month === 12) {
    return isHijriLeapYear(year) ? 30 : 29;
  }
  return month % 2 === 1 ? 30 : 29;
}

// ============================================================================
// HIJRI → JULIAN DAY
// ============================================================================
function hijriToJD(year: number, month: number, day: number): number {
  let days =
    (year - 1) * 354 +
    Math.floor((3 + 11 * year) / 30);

  for (let m = 1; m < month; m++) {
    days += hijriMonthLength(year, m);
  }

  days += day - 1;

  return HIJRI_EPOCH + days;
}

// ============================================================================
// JULIAN DAY → HIJRI
// ============================================================================
function jdToHijri(jd: number): HijriDate {
  const days = Math.floor(jd - HIJRI_EPOCH);

  // Jahr berechnen
  const year = Math.floor((30 * days + 10646) / 10631);

  // Tag im Jahr bestimmen
  let dayOfYear =
    days -
    ((year - 1) * 354 + Math.floor((3 + 11 * year) / 30));

  // Monat berechnen
  let month = 1;
  while (month <= 12) {
    const len = hijriMonthLength(year, month);
    if (dayOfYear < len) break;
    dayOfYear -= len;
    month++;
  }

  const day = dayOfYear + 1;

  return { year, month, day };
}

// ============================================================================
// EXPORT: GREGORIAN → HIJRI
// ============================================================================
export function gregorianToHijri(y: number, m: number, d: number): HijriDate {
  return jdToHijri(gregorianToJD(y, m, d));
}

// ============================================================================
// EXPORT: HIJRI → GREGORIAN
// ============================================================================
export function hijriToGregorian(y: number, m: number, d: number): GregorianDate {
  return jdToGregorian(hijriToJD(y, m, d));
}

// ============================================================================
// WEIßE TAGE (13.–15. Hijri) – IMMER korrekt
// ============================================================================
export function getWhiteDaysForMonth(hYear: number, hMonth: number): Date[] {
  const dates: Date[] = [];

  for (const d of [13, 14, 15]) {
    const jd = hijriToJD(hYear, hMonth, d);
    const g = jdToGregorian(jd);

    dates.push(new Date(g.year, g.month - 1, g.day));
  }

  return dates;
}

// ============================================================================
// OPTIONAL: Formate / Labels
// ============================================================================
export function getHijriMonthName(month: number, lang: 'de' | 'ar' | 'en' = 'de'): string {
  const names = {
    de: [
      'Muharram', 'Safar', 'Rabiʿ al-Awwal', 'Rabiʿ ath-Thani',
      'Dschumada al-Ula', 'Dschumada ath-Thania', 'Radschab', 'Schaʿban',
      'Ramadan', 'Schawwal', 'Dhu l-Qaʿda', 'Dhu l-Hiddscha'
    ],
    ar: [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
      'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ],
    en: [
      'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
      'Jumada al-Ula', 'Jumada al-Thani', 'Rajab', 'Shaʿban',
      'Ramadan', 'Shawwal', 'Dhu al-Qi’dah', 'Dhu al-Hijjah'
    ],
  };

  return names[lang][month - 1] || '';
}

// ============================================================================
// WHITE DAY INTERFACE (gleich wie vorher)
// ============================================================================
export interface WhiteDay {
  gregorianDate: Date;
  hijriDate: HijriDate;
  weekday: string;
  hijriLabel: string;
  gregorianLabel: string;
  timezoneId: string;
  isToday: boolean;
  isRamadan: boolean;
  offsetDays: -1 | 0 | 1;
}

// ============================================================================
// WEEKDAY NAME
// ============================================================================
export function getWeekdayName(date: Date, lang: 'de' | 'en' = 'de'): string {
  const opts: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', opts);
}

// ============================================================================
// GREGORIAN LABEL
// ============================================================================
export function formatGregorianDate(date: Date, lang: 'de' | 'en' = 'de'): string {
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// ============================================================================
// HIJRI LABEL
// ============================================================================
export function formatHijriDate(h: HijriDate, lang: 'de' | 'ar' | 'en' = 'de'): string {
  const monthName = getHijriMonthName(h.month, lang);
  return `${h.day}. ${monthName} ${h.year}`;
}

// ============================================================================
// UPCOMING WHITE DAYS (13–15 Hijri) — FEHLERFREI
// ============================================================================
export function getUpcomingWhiteDays(
  count: number = 12,
  timezone?: string,
  offsetDays: -1 | 0 | 1 = 0
): WhiteDay[] {
  const result: WhiteDay[] = [];

  const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // aktuelles Hijri-Datum (NEUE KONVERTIERUNG)
  const nowHijri = gregorianToHijri(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  let hYear = nowHijri.year;
  let hMonth = nowHijri.month;

  // Wenn wir nach dem 15. sind → nächsten Monat beginnen
  if (nowHijri.day > 15) {
    hMonth++;
    if (hMonth > 12) {
      hMonth = 1;
      hYear++;
    }
  }

  while (result.length < count) {

    // immer korrekte 13–15 Hijri
    const days = getWhiteDaysForMonth(hYear, hMonth);

    for (const gDate of days) {
      const adjusted = new Date(gDate);
      adjusted.setDate(adjusted.getDate() + offsetDays);

      if (adjusted >= todayStart && result.length < count) {
        
        const hijri = gregorianToHijri(
          adjusted.getFullYear(),
          adjusted.getMonth() + 1,
          adjusted.getDate()
        );

        result.push({
          gregorianDate: adjusted,
          hijriDate: hijri,
          weekday: getWeekdayName(adjusted),
          hijriLabel: formatHijriDate(hijri),
          gregorianLabel: formatGregorianDate(adjusted),
          timezoneId: tz,
          isToday: adjusted.toDateString() === todayStart.toDateString(),
          isRamadan: hijri.month === 9,
          offsetDays
        });
      }
    }

    // nächsten Hijri-Monat gehen
    hMonth++;
    if (hMonth > 12) {
      hMonth = 1;
      hYear++;
    }
  }

  return result;
}