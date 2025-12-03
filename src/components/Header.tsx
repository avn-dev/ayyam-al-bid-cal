import { Moon } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-8 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 animate-float">
        <Moon className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
        Weiße Tage
      </h1>
      <p className="text-lg text-muted-foreground font-display">
        أيام البيض
      </p>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        Die 13., 14. und 15. Tage des islamischen Mondmonats – 
        empfohlen zum Fasten.
      </p>
    </header>
  );
}
