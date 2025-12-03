import { Moon, Stars } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-8 animate-fade-in relative">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky to-sky-light mb-4 animate-float glow-sky relative">
        <Moon className="w-10 h-10 text-primary-foreground" fill="currentColor" />
        <Stars className="w-5 h-5 text-starlight absolute -top-1 -right-1 animate-pulse-soft" />
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
        Weiße Tage
      </h1>
      <p className="text-lg text-starlight font-display">
        أيام البيض
      </p>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        Die 13., 14. und 15. Tage des islamischen Mondmonats – 
        empfohlen zum Fasten.
      </p>
    </header>
  );
}
