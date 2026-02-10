import Header from "@/components/Header";
import SignalPanel from "@/components/SignalPanel";
import BrokerEmbed from "@/components/BrokerEmbed";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header />
      <div className="flex-1 flex min-h-0">
        {/* Signals Panel - Left */}
        <div className="w-80 min-w-[280px] max-w-[360px] flex-shrink-0 p-2">
          <SignalPanel />
        </div>
        {/* Broker - Right */}
        <div className="flex-1 p-2 pl-0">
          <BrokerEmbed />
        </div>
      </div>
    </div>
  );
};

export default Index;
