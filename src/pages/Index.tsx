import { useMemo } from 'react';
import { getUpcomingWhiteDays } from '@/lib/hijri';
import { getAutoDetectedTimezone } from '@/lib/timezones';
import { Header } from '@/components/Header';
import { WhiteDayCard } from '@/components/WhiteDayCard';
import { ExportPanel } from '@/components/ExportPanel';
import { InfoSection } from '@/components/InfoSection';

const Index = () => {
  const timezone = getAutoDetectedTimezone();
  
  const whiteDays = useMemo(() => {
    return getUpcomingWhiteDays(12, timezone);
  }, [timezone]);

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
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2 animate-fade-in" style={{ animationDelay: '150ms' }}>
            Kommende weiße Tage
            <span className="text-sm font-normal text-muted-foreground">
              ({whiteDays.length})
            </span>
          </h2>
          
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
