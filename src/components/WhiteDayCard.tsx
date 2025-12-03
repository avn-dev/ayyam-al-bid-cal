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
        isNext ? 'ring-2 ring-primary/30 glow-sky' : ''
      }`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      {isNext && (
        <span className="inline-block px-2.5 py-0.5 mb-2 text-xs font-medium rounded-full bg-primary/15 text-primary">
          Nächster weißer Tag
        </span>
      )}
      
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
    </div>
  );
}
