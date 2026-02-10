import { Bot, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [time, setTime] = useState(new Date());
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-foreground text-lg leading-tight tracking-tight">
            ROBO<span className="text-primary">TRADER</span>
          </h1>
          <p className="text-xs text-muted-foreground font-mono">Sinais Automáticos</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border">
          {connected ? (
            <Wifi className="w-4 h-4 text-signal-buy" />
          ) : (
            <WifiOff className="w-4 h-4 text-signal-sell" />
          )}
          <span className="font-mono text-xs text-muted-foreground">
            {connected ? "CONECTADO" : "DESCONECTADO"}
          </span>
        </div>
        <div className="font-mono text-sm text-foreground tabular-nums">
          {time.toLocaleTimeString("pt-BR")}
        </div>
      </div>
    </header>
  );
};

export default Header;
