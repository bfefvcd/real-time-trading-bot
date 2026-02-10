import { useState } from "react";
import { ExternalLink, RefreshCw, AlertTriangle } from "lucide-react";

const BrokerEmbed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const brokerUrl = "https://pocketoption.com/pt/cabinet/demo-quick-high-low/";

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-signal-sell" />
          <div className="w-3 h-3 rounded-full bg-signal-wait" />
          <div className="w-3 h-3 rounded-full bg-signal-buy" />
        </div>
        <span className="font-mono text-xs text-muted-foreground truncate mx-4">
          Pocket Option - Corretora
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsLoading(true);
              setHasError(false);
            }}
            className="p-1 rounded hover:bg-muted transition-colors"
            title="Recarregar"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
          <a
            href={brokerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-muted transition-colors"
            title="Abrir em nova aba"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* Iframe */}
      <div className="flex-1 relative">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Carregando corretora...</p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="text-center max-w-md px-6">
              <AlertTriangle className="w-12 h-12 text-signal-wait mx-auto mb-4" />
              <h3 className="text-foreground font-bold mb-2">Corretora bloqueou incorporação</h3>
              <p className="text-sm text-muted-foreground mb-4">
                A Pocket Option não permite ser incorporada em outros sites por segurança. 
                Use o botão abaixo para abrir em uma nova aba ao lado.
              </p>
              <a
                href={brokerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir Pocket Option
              </a>
            </div>
          </div>
        )}

        <iframe
          src={brokerUrl}
          className="w-full h-full border-0"
          title="Pocket Option"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default BrokerEmbed;
