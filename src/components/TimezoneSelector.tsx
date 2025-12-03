import { Globe, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COMMON_TIMEZONES, getAutoDetectedTimezone, getCurrentOffset } from '@/lib/timezones';

interface TimezoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  const autoDetected = getAutoDetectedTimezone();
  const currentOffset = getCurrentOffset(value);
  
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Globe className="w-4 h-4" />
        Zeitzone
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-card border-border">
          <SelectValue placeholder="Zeitzone wählen" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border max-h-[300px]">
          {/* Auto-detected option */}
          <SelectItem value={autoDetected} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="font-medium">Automatisch erkannt</span>
              {value === autoDetected && <Check className="w-4 h-4 text-primary" />}
            </div>
            <span className="text-xs text-muted-foreground block">
              {autoDetected} ({getCurrentOffset(autoDetected)})
            </span>
          </SelectItem>
          
          <div className="h-px bg-border my-2" />
          
          {COMMON_TIMEZONES.map((tz) => (
            <SelectItem key={tz.id} value={tz.id} className="cursor-pointer">
              <div className="flex flex-col">
                <span>{tz.label}</span>
                <span className="text-xs text-muted-foreground">
                  {tz.id} ({tz.offset})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Aktuelle Zeit: {currentOffset}
      </p>
    </div>
  );
}
