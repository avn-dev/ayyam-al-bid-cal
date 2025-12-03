// Common IANA timezone list with labels
export interface TimezoneOption {
  id: string;
  label: string;
  offset: string;
}

export const COMMON_TIMEZONES: TimezoneOption[] = [
  { id: 'Europe/Berlin', label: 'Berlin, Deutschland', offset: 'UTC+1/+2' },
  { id: 'Europe/Vienna', label: 'Wien, Österreich', offset: 'UTC+1/+2' },
  { id: 'Europe/Zurich', label: 'Zürich, Schweiz', offset: 'UTC+1/+2' },
  { id: 'Europe/London', label: 'London, UK', offset: 'UTC+0/+1' },
  { id: 'Europe/Paris', label: 'Paris, Frankreich', offset: 'UTC+1/+2' },
  { id: 'Europe/Amsterdam', label: 'Amsterdam, Niederlande', offset: 'UTC+1/+2' },
  { id: 'Europe/Brussels', label: 'Brüssel, Belgien', offset: 'UTC+1/+2' },
  { id: 'Europe/Istanbul', label: 'Istanbul, Türkei', offset: 'UTC+3' },
  { id: 'Asia/Dubai', label: 'Dubai, VAE', offset: 'UTC+4' },
  { id: 'Asia/Riyadh', label: 'Riad, Saudi-Arabien', offset: 'UTC+3' },
  { id: 'Asia/Karachi', label: 'Karachi, Pakistan', offset: 'UTC+5' },
  { id: 'Asia/Kolkata', label: 'Mumbai, Indien', offset: 'UTC+5:30' },
  { id: 'Asia/Dhaka', label: 'Dhaka, Bangladesch', offset: 'UTC+6' },
  { id: 'Asia/Jakarta', label: 'Jakarta, Indonesien', offset: 'UTC+7' },
  { id: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur, Malaysia', offset: 'UTC+8' },
  { id: 'Africa/Cairo', label: 'Kairo, Ägypten', offset: 'UTC+2' },
  { id: 'Africa/Casablanca', label: 'Casablanca, Marokko', offset: 'UTC+0/+1' },
  { id: 'Africa/Lagos', label: 'Lagos, Nigeria', offset: 'UTC+1' },
  { id: 'America/New_York', label: 'New York, USA', offset: 'UTC-5/-4' },
  { id: 'America/Los_Angeles', label: 'Los Angeles, USA', offset: 'UTC-8/-7' },
  { id: 'America/Chicago', label: 'Chicago, USA', offset: 'UTC-6/-5' },
  { id: 'America/Toronto', label: 'Toronto, Kanada', offset: 'UTC-5/-4' },
  { id: 'Australia/Sydney', label: 'Sydney, Australien', offset: 'UTC+10/+11' },
  { id: 'Pacific/Auckland', label: 'Auckland, Neuseeland', offset: 'UTC+12/+13' },
];

// Get auto-detected timezone
export function getAutoDetectedTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Get timezone label by ID
export function getTimezoneLabel(id: string): string {
  const tz = COMMON_TIMEZONES.find(t => t.id === id);
  return tz ? tz.label : id;
}

// Get current offset for a timezone
export function getCurrentOffset(timezoneId: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneId,
    timeZoneName: 'shortOffset'
  });
  
  const parts = formatter.formatToParts(now);
  const offsetPart = parts.find(p => p.type === 'timeZoneName');
  return offsetPart?.value || '';
}
