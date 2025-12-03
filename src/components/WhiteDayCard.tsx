import { WhiteDay } from '@/lib/hijri';

interface WhiteDayCardProps {
  day: WhiteDay;
  index: number;
  isNext?: boolean;
}

export function WhiteDayCard({ day, index, isNext = false }: WhiteDayCardProps) {
  return (
    <div
      className={`card-elevated p-4 transition-all duration-300 hover:scale-[1.01] animate-slide-up opacity-0 ${
        isNext || day.isToday ? 'ring-2 ring-primary/30 glow-sky' : ''
      }`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex flex-wrap gap-2 mb-2">
        {isNext && (
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/15 text-primary">
            Nächster weißer Tag
          </span>
        )}
        {day.isToday && (
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
            Heute
          </span>
        )}
        {day.isRamadan && (
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            Ramadan
          </span>
        )}
        {day.offsetDays !== 0 && (
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-100">
            {day.offsetDays > 0 ? '+1 Tag' : '-1 Tag'} lokale Anpassung
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground mb-0.5">
            {day.weekday}
          </p>
          <h3 className="text-lg font-semibold text-foreground">
            {day.gregorianLabel}
          </h3>
          <p className="text-sm text-primary font-display">
            {day.hijriLabel}
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center min-w-[50px] py-1.5 px-2.5 rounded-lg bg-primary/10">
          <span className="text-2xl font-bold text-primary font-display">
            {day.hijriDate.day}
          </span>
          <span className="text-[10px] text-muted-foreground">Hijri</span>
        </div>
      </div>

      {(day.isToday || day.isRamadan) && (
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          {day.isToday && (
            <p className="text-foreground font-medium">Heute ist ein weißer Tag – perfekter Zeitpunkt zum Fasten.</p>
          )}
          {day.isRamadan && (
            <p className="leading-relaxed">
              Während des Ramadan wird ohnehin durchgehend gefastet. Die weißen Tage gelten daher nicht als zusätzliches Sunnah-Fasten.
            </p>
          )}
        </div>
      )}

      {day.offsetDays !== 0 && (
        <div className="mt-3 text-xs text-muted-foreground">
          <p className="leading-relaxed">
            Hinweis: Diese Termine sind um {day.offsetDays > 0 ? '+1' : '-1'} Tag verschoben, damit sie sicher mit der lokalen Mondsichtung übereinstimmen.
          </p>
        </div>
      )}
    </div>
  );
}
