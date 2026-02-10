import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, Clock, TrendingUp, TrendingDown, Zap } from "lucide-react";

type Signal = {
  id: number;
  type: "BUY" | "SELL" | "WAIT";
  pair: string;
  time: string;
  expiry: string;
  confidence: number;
};

const PAIRS = [
  "EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "EUR/GBP",
  "USD/CHF", "NZD/USD", "EUR/JPY", "GBP/JPY", "AUD/JPY",
];

const generateSignal = (id: number): Signal => {
  const types: ("BUY" | "SELL" | "WAIT")[] = ["BUY", "SELL", "WAIT"];
  const type = types[Math.floor(Math.random() * 3)];
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const now = new Date();
  const confidence = Math.floor(Math.random() * 30) + 70;
  const expiryMins = [1, 2, 3, 5][Math.floor(Math.random() * 4)];

  return {
    id,
    type,
    pair,
    time: now.toLocaleTimeString("pt-BR"),
    expiry: `${expiryMins}min`,
    confidence,
  };
};

const SignalPanel = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [signalCount, setSignalCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Generate initial signals
    const initial = Array.from({ length: 5 }, (_, i) => generateSignal(i));
    setSignals(initial);
    setSignalCount(5);

    // Auto-generate new signals
    const interval = setInterval(() => {
      if (!isActive) return;
      setSignalCount((prev) => {
        const newCount = prev + 1;
        const newSignal = generateSignal(newCount);
        setSignals((prevSignals) => [newSignal, ...prevSignals.slice(0, 19)]);
        return newCount;
      });
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getSignalIcon = (type: Signal["type"]) => {
    switch (type) {
      case "BUY":
        return <ArrowUpCircle className="w-5 h-5 text-signal-buy" />;
      case "SELL":
        return <ArrowDownCircle className="w-5 h-5 text-signal-sell" />;
      case "WAIT":
        return <Clock className="w-5 h-5 text-signal-wait" />;
    }
  };

  const getSignalClass = (type: Signal["type"]) => {
    switch (type) {
      case "BUY": return "border-signal-buy/30 bg-signal-buy/5";
      case "SELL": return "border-signal-sell/30 bg-signal-sell/5";
      case "WAIT": return "border-signal-wait/30 bg-signal-wait/5";
    }
  };

  const getGlow = (type: Signal["type"]) => {
    switch (type) {
      case "BUY": return "glow-green";
      case "SELL": return "glow-red";
      case "WAIT": return "glow-yellow";
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">
            Sinais ao Vivo
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {signals.length} sinais
          </span>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-3 h-3 rounded-full transition-all ${
              isActive ? "bg-signal-buy signal-pulse" : "bg-signal-sell"
            }`}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-border">
        <div className="bg-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-signal-buy" />
            <span className="text-xs text-muted-foreground">BUY</span>
          </div>
          <span className="font-mono text-sm font-bold text-signal-buy">
            {signals.filter((s) => s.type === "BUY").length}
          </span>
        </div>
        <div className="bg-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingDown className="w-3 h-3 text-signal-sell" />
            <span className="text-xs text-muted-foreground">SELL</span>
          </div>
          <span className="font-mono text-sm font-bold text-signal-sell">
            {signals.filter((s) => s.type === "SELL").length}
          </span>
        </div>
        <div className="bg-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-signal-wait" />
            <span className="text-xs text-muted-foreground">WAIT</span>
          </div>
          <span className="font-mono text-sm font-bold text-signal-wait">
            {signals.filter((s) => s.type === "WAIT").length}
          </span>
        </div>
      </div>

      {/* Signal List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        <AnimatePresence mode="popLayout">
          {signals.map((signal) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-md border ${getSignalClass(signal.type)} ${
                signal.id === signals[0]?.id ? getGlow(signal.type) : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSignalIcon(signal.type)}
                  <div>
                    <div className="font-mono font-bold text-sm text-foreground">
                      {signal.pair}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {signal.time} · {signal.expiry}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-mono font-bold text-sm ${
                      signal.type === "BUY"
                        ? "text-signal-buy"
                        : signal.type === "SELL"
                        ? "text-signal-sell"
                        : "text-signal-wait"
                    }`}
                  >
                    {signal.type}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {signal.confidence}%
                  </div>
                </div>
              </div>

              {/* Confidence bar */}
              <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${signal.confidence}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`h-full rounded-full ${
                    signal.type === "BUY"
                      ? "bg-signal-buy"
                      : signal.type === "SELL"
                      ? "bg-signal-sell"
                      : "bg-signal-wait"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignalPanel;
