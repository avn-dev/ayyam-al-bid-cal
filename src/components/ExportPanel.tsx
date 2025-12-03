import { WhiteDay } from '@/lib/hijri';
import { downloadICS, getGoogleCalendarUrl } from '@/lib/ics-export';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Smartphone, Monitor } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ExportPanelProps {
  whiteDays: WhiteDay[];
}

export function ExportPanel({ whiteDays }: ExportPanelProps) {
  const handleExportYear = () => {
    downloadICS(whiteDays, 'weisse-tage-jahresexport.ics');
  };

  const handleExportNext = () => {
    const nextThree = whiteDays.slice(0, 3);
    downloadICS(nextThree, 'naechste-weisse-tage.ics');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full gap-2 btn-primary-gradient hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" />
          Exportieren
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Kalender-Export</DialogTitle>
          <DialogDescription>
            Exportiere die weißen Tage in deinen Kalender.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* ICS Downloads */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Download className="w-4 h-4" />
              ICS-Datei herunterladen
            </h4>
            <p className="text-xs text-muted-foreground">
              Funktioniert mit allen Kalender-Apps (iOS, Android, Windows, macOS)
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportYear}
                className="flex-1 gap-2"
              >
                <Calendar className="w-4 h-4" />
                Komplettes Jahr
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportNext}
                className="flex-1 gap-2"
              >
                <Calendar className="w-4 h-4" />
                Nächste 3 Tage
              </Button>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Direkt-Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => whiteDays[0] && window.open(getGoogleCalendarUrl(whiteDays[0]), '_blank')}
                className="gap-2"
              >
                Google
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleExportNext}
                className="gap-2"
              >
                <Monitor className="w-4 h-4" />
                Outlook
              </Button>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Instructions */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="text-sm font-medium mb-2">Anleitung</h4>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Lade die ICS-Datei herunter</li>
              <li>Öffne die Datei auf deinem Gerät</li>
              <li>Bestätige das Hinzufügen zum Kalender</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
