import { useState, useMemo } from 'react';
import { getUpcomingWhiteDays } from '@/lib/hijri';
import { getAutoDetectedTimezone } from '@/lib/timezones';
import { Header } from '@/components/Header';
import { WhiteDayCard } from '@/components/WhiteDayCard';
import { TimezoneSelector } from '@/components/TimezoneSelector';
import { ExportPanel } from '@/components/ExportPanel';
import { InfoSection } from '@/components/InfoSection';

const Index = () => {
  const [timezone, setTimezone] = useState(getAutoDetectedTimezone());
  
  const whiteDays = useMemo(() => {
    return getUpcomingWhiteDays(12, timezone);
  }, [timezone]);

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <div className="container max-w-2xl py-8 px-4">
        <Header />
        
        {/* Controls Section */}
        <div className="card-elevated p-5 mb-6 animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <TimezoneSelector value={timezone} onChange={setTimezone} />
            </div>
            <div className="sm:w-48 sm:self-end">
              <ExportPanel whiteDays={whiteDays} />
            </div>
          </div>
        </div>
        
        {/* White Days List */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Kommende weiße Tage
            <span className="text-sm font-normal text-muted-foreground">
              ({whiteDays.length} Termine)
            </span>
          </h2>
          
          <div className="grid gap-4">
            {whiteDays.map((day, index) => (
              <WhiteDayCard 
                key={day.gregorianDate.toISOString()} 
                day={day} 
                index={index}
                isNext={index === 0}
              />
            ))}
          </div>
        </section>
        
        {/* Info Section */}
        <InfoSection />
        
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/50 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-xs text-muted-foreground">
            Basierend auf astronomischen Berechnungen. 
            Tatsächliche Daten können je nach Mondsichtung abweichen.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Zeitzone: {timezone}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
