import { useMemo, useState } from 'react';
import { getUpcomingWhiteDays } from '@/lib/hijri';
import { getAutoDetectedTimezone } from '@/lib/timezones';
import { Header } from '@/components/Header';
import { WhiteDayCard } from '@/components/WhiteDayCard';
import { ExportPanel } from '@/components/ExportPanel';
import { InfoSection } from '@/components/InfoSection';

const Index = () => {
  const [displayCount, setDisplayCount] = useState<3 | 6>(6);
  const timezone = getAutoDetectedTimezone();

  const whiteDays = useMemo(() => {
    return getUpcomingWhiteDays(displayCount, timezone);
  }, [displayCount, timezone]);

  return (
    <div className="min-h-screen bg-background starry-bg">
      <div className="container max-w-xl py-6 px-4 relative z-10">
        <Header />
        
        {/* Export Button */}
        <div className="flex justify-center mb-6 animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <ExportPanel whiteDays={whiteDays} />
        </div>
        
        {/* White Days List */}
        <section>
          <div className="flex items-center justify-between gap-3 mb-3 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              Kommende weiße Tage
              <span className="text-sm font-normal text-muted-foreground">
                ({whiteDays.length})
              </span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Anzahl:</span>
              <div className="flex rounded-lg overflow-hidden border border-border/60">
                {[3, 6].map((count) => (
                  <button
                    key={count}
                    onClick={() => setDisplayCount(count as 3 | 6)}
                    className={`px-3 py-1 font-medium transition-colors ${
                      displayCount === count
                        ? 'bg-primary/15 text-primary'
                        : 'bg-muted/30 hover:bg-muted/60'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
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
        <footer className="mt-10 pt-5 border-t border-border/50 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-xs text-muted-foreground">
            Basierend auf astronomischen Berechnungen. 
            Tatsächliche Daten können je nach Mondsichtung abweichen.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
