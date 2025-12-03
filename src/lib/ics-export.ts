import { WhiteDay } from './hijri';

// Generate ICS file content
export function generateICS(whiteDays: WhiteDay[], title: string = 'Weiße Tage (Ayyam al-Bid)'): string {
  const now = new Date();
  const timestamp = formatDateToICS(now);
  
  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Weiße Tage App//DE
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${title}
X-WR-TIMEZONE:UTC
`;

  whiteDays.forEach((day, index) => {
    const dateStr = formatDateOnlyToICS(day.gregorianDate);
    const nextDay = new Date(day.gregorianDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDateStr = formatDateOnlyToICS(nextDay);
    const adjustmentNote =
      day.offsetDays === 0
        ? ''
        : `\\n\\nLokale Anpassung: ${day.offsetDays > 0 ? '+1 Tag' : '-1 Tag'} gegenüber Umm al-Qura.`;

    ics += `BEGIN:VEVENT
UID:whitday-${dateStr}-${index}@weissetage.app
DTSTAMP:${timestamp}
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${nextDateStr}
SUMMARY:Weißer Tag - ${day.hijriDate.day}. Tag
DESCRIPTION:${day.hijriLabel}\\n\\nAyyam al-Bid (weiße Tage) - empfohlen zu fasten.${adjustmentNote}
CATEGORIES:Islamischer Kalender,Weiße Tage
STATUS:CONFIRMED
TRANSP:TRANSPARENT
END:VEVENT
`;
  });

  ics += 'END:VCALENDAR';
  
  return ics;
}

// Format date for ICS (with time)
function formatDateToICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// Format date only for ICS (YYYYMMDD)
function formatDateOnlyToICS(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// Download ICS file
export function downloadICS(whiteDays: WhiteDay[], filename: string = 'weisse-tage.ics'): void {
  const icsContent = generateICS(whiteDays);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate Google Calendar URL for a single event
export function getGoogleCalendarUrl(day: WhiteDay): string {
  const startDate = formatDateOnlyToICS(day.gregorianDate);
  const nextDay = new Date(day.gregorianDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const endDate = formatDateOnlyToICS(nextDay);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Weißer Tag - ${day.hijriDate.day}. Tag`,
    dates: `${startDate}/${endDate}`,
    details: `${day.hijriLabel}\n\nAyyam al-Bid (weiße Tage) - empfohlen zu fasten.`,
    ctz: day.timezoneId
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Generate Outlook Web URL for a single event
export function getOutlookUrl(day: WhiteDay): string {
  const startDate = day.gregorianDate.toISOString().split('T')[0];
  const nextDay = new Date(day.gregorianDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const endDate = nextDay.toISOString().split('T')[0];
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `Weißer Tag - ${day.hijriDate.day}. Tag`,
    startdt: startDate,
    enddt: endDate,
    body: `${day.hijriLabel}\n\nAyyam al-Bid (weiße Tage) - empfohlen zu fasten.`,
    allday: 'true'
  });
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}
