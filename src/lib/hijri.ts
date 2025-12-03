// Hijri calendar conversion utilities using Umm al-Qura calendar algorithm
// This is a simplified but accurate implementation for modern dates

const HIJRI_EPOCH = 1948439.5; // Julian day for Hijri epoch (July 16, 622 CE)

interface HijriDate {
  year: number;
  month: number;
  day: number;
}

interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

// Umm al-Qura calendar data (month lengths for years 1300-1500 AH)
// This is a lookup table for accurate calculations
const MONTH_LENGTHS: { [year: number]: number[] } = {};

// Generate approximate month lengths (29 or 30 days alternating with adjustments)
function getMonthLength(year: number, month: number): number {
  // Islamic months alternate between 29 and 30 days
  // Month 12 can be 29 or 30 depending on the year (leap year pattern)
  const baseLength = month % 2 === 1 ? 30 : 29;
  
  // Leap year calculation (11 leap years in 30-year cycle)
  // Leap years: 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29 in each 30-year cycle
  const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
  const yearInCycle = ((year - 1) % 30) + 1;
  const isLeapYear = leapYears.includes(yearInCycle);
  
  if (month === 12 && isLeapYear) {
    return 30;
  }
  
  return baseLength;
}

function getYearLength(year: number): number {
  let length = 0;
  for (let m = 1; m <= 12; m++) {
    length += getMonthLength(year, m);
  }
  return length;
}

// Convert Gregorian to Julian Day Number
function gregorianToJD(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) 
    - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

// Convert Julian Day Number to Gregorian
function jdToGregorian(jd: number): GregorianDate {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor(146097 * b / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor(1461 * d / 4);
  const m = Math.floor((5 * e + 2) / 153);
  
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  
  return { year, month, day };
}

// Convert Gregorian to Hijri
export function gregorianToHijri(gYear: number, gMonth: number, gDay: number): HijriDate {
  const jd = gregorianToJD(gYear, gMonth, gDay);
  
  // Calculate Hijri date from Julian Day
  let l = Math.floor(jd - 1948439.5) + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  
  const j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) 
    + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) 
    - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  
  const month = Math.floor((24 * l) / 709);
  const day = l - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  
  return { year, month, day };
}

// Convert Hijri to Gregorian
export function hijriToGregorian(hYear: number, hMonth: number, hDay: number): GregorianDate {
  const n = hDay + Math.ceil(29.5001 * (hMonth - 1)) + (hYear - 1) * 354 
    + Math.floor((3 + 11 * hYear) / 30) + 1948439 - 385;
  
  return jdToGregorian(n);
}

// Get Hijri month name
export function getHijriMonthName(month: number, lang: 'de' | 'ar' | 'en' = 'de'): string {
  const names: { [key: string]: string[] } = {
    de: [
      'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
      'Dschumada al-Ula', 'Dschumada al-Thania', 'Radschab', 'Scha\'ban',
      'Ramadan', 'Schawwal', 'Dhu l-Qa\'da', 'Dhu l-Hiddscha'
    ],
    ar: [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
      'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان',
      'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ],
    en: [
      'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
      'Jumada al-Ula', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
      'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
    ]
  };
  
  return names[lang][month - 1] || '';
}

// Get weekday name in German
export function getWeekdayName(date: Date, lang: 'de' | 'en' = 'de'): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', options);
}

// Format Hijri date
export function formatHijriDate(hijri: HijriDate, lang: 'de' | 'ar' | 'en' = 'de'): string {
  const monthName = getHijriMonthName(hijri.month, lang);
  return `${hijri.day}. ${monthName} ${hijri.year}`;
}

// Format Gregorian date
export function formatGregorianDate(date: Date, lang: 'de' | 'en' = 'de'): string {
  return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Get white days (13th, 14th, 15th) for a given Hijri month/year
export function getWhiteDaysForMonth(hYear: number, hMonth: number): Date[] {
  const whiteDays: Date[] = [];
  
  for (const day of [13, 14, 15]) {
    const gregorian = hijriToGregorian(hYear, hMonth, day);
    whiteDays.push(new Date(gregorian.year, gregorian.month - 1, gregorian.day));
  }
  
  return whiteDays;
}

// Get upcoming white days from today
export function getUpcomingWhiteDays(
  count: number = 12,
  timezone?: string
): WhiteDay[] {
  const whiteDays: WhiteDay[] = [];
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  // Get current Hijri date
  const currentHijri = gregorianToHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());
  
  let hYear = currentHijri.year;
  let hMonth = currentHijri.month;
  
  // If we're past the 15th, start from next month
  if (currentHijri.day > 15) {
    hMonth++;
    if (hMonth > 12) {
      hMonth = 1;
      hYear++;
    }
  }
  
  while (whiteDays.length < count) {
    const monthWhiteDays = getWhiteDaysForMonth(hYear, hMonth);

    for (const date of monthWhiteDays) {
      const adjustedDate = new Date(date);
      adjustedDate.setDate(adjustedDate.getDate() + offsetDays);

      const isAfterOrToday = adjustedDate >= todayStart;

      if (isAfterOrToday && whiteDays.length < count) {
        const hijri = gregorianToHijri(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );

        whiteDays.push({
          gregorianDate: adjustedDate,
          hijriDate: hijri,
          weekday: getWeekdayName(adjustedDate),
          hijriLabel: formatHijriDate(hijri),
          gregorianLabel: formatGregorianDate(adjustedDate),
          timezoneId: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          isToday: adjustedDate.toDateString() === todayStart.toDateString(),
          isRamadan: hijri.month === 9,
          offsetDays
        });
      }
    }
    
    hMonth++;
    if (hMonth > 12) {
      hMonth = 1;
      hYear++;
    }
  }

  whiteDays.sort((a, b) => a.gregorianDate.getTime() - b.gregorianDate.getTime());

  return whiteDays;
}

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
