import { Moon, Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function InfoSection() {
  return (
    <section className="mt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Moon className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-display font-semibold">Was sind die weißen Tage?</h2>
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-4">
          Die <strong className="text-foreground">weißen Tage</strong> (arabisch: أيام البيض, Ayyam al-Bid)
          sind der 13., 14. und 15. Tag jedes islamischen Mondmonats. Sie werden so genannt, weil der
          Mond in diesen Nächten am hellsten scheint und die Nächte besonders hell erleuchtet.
        </p>

        <div className="rounded-lg bg-amber-100/80 dark:bg-amber-900/20 border border-amber-200/70 dark:border-amber-800/60 text-amber-900 dark:text-amber-100 p-3 mb-4 text-sm">
          Hinweis für Ramadan: Während des Fastenmonats wird ohnehin täglich gefastet. Die weißen Tage werden dann nicht
          zusätzlich als freiwilliges Fasten herausgestellt.
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="fasting" className="border-border/50">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Warum fasten Muslime an diesen Tagen?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              <p className="mb-2">
                Der Prophet Muhammad ﷺ empfahl das Fasten an diesen drei Tagen jeden Monats. 
                Es wird überliefert, dass er sagte:
              </p>
              <blockquote className="border-l-2 border-primary/30 pl-4 italic my-3">
                „Das Fasten von drei Tagen jeden Monat ist wie das Fasten des ganzen Lebens."
              </blockquote>
              <p>
                (Sahih al-Bukhari und Muslim)
              </p>
              <p className="mt-2">
                Das Fasten an diesen Tagen gilt als freiwillige Ibadah (Gottesdienst) mit 
                besonderer Belohnung.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="calculation" className="border-border/50">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Wie werden die Daten berechnet?
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              <p>
                Die Daten basieren auf dem islamischen Hijri-Kalender, der dem Mondzyklus folgt. 
                Ein islamischer Monat beginnt mit der Sichtung des Neumondes und hat 29 oder 30 Tage.
              </p>
              <p className="mt-2">
                Diese App verwendet astronomische Berechnungen für den Umm al-Qura Kalender. 
                Die tatsächlichen Daten können je nach lokaler Mondsichtung um ±1 Tag abweichen.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
