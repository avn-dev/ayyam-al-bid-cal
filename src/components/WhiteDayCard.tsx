import { WhiteDay } from '@/lib/hijri';
import { Calendar, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { downloadICS, getGoogleCalendarUrl, getOutlookUrl } from '@/lib/ics-export';

interface WhiteDayCardProps {
  day: WhiteDay;
  index: number;
  isNext?: boolean;
}

export function WhiteDayCard({ day, index, isNext = false }: WhiteDayCardProps) {
  const handleExportSingle = () => {
    downloadICS([day], `weisser-tag-${day.gregorianDate.toISOString().split('T')[0]}.ics`);
  };

  return (
    <div 
      className={`card-elevated p-5 transition-all duration-300 hover:scale-[1.02] animate-slide-up opacity-0 ${
        isNext ? 'ring-2 ring-primary/30 glow-emerald' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {isNext && (
        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-primary/10 text-primary">
          Nächster weißer Tag
        </span>
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {day.weekday}
          </p>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {day.gregorianLabel}
          </h3>
          <p className="text-base text-primary font-display">
            {day.hijriLabel}
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg bg-primary/5">
          <span className="text-3xl font-bold text-primary font-display">
            {day.hijriDate.day}
          </span>
          <span className="text-xs text-muted-foreground">Hijri</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <Calendar className="w-4 h-4" />
              Exportieren
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-popover">
            <DropdownMenuItem onClick={handleExportSingle} className="gap-2 cursor-pointer">
              <Download className="w-4 h-4" />
              ICS-Datei herunterladen
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => window.open(getGoogleCalendarUrl(day), '_blank')}
              className="gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Google Kalender
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => window.open(getOutlookUrl(day), '_blank')}
              className="gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Outlook
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
