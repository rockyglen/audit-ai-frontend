import ChatInterface from "../../components/ChatInterface";

export default function ChatPage() {
  return (
    <div className="h-screen w-full bg-[#000000] flex items-center justify-center p-4 sm:p-6">
        {/* This container controls the size of the "Console".
           max-w-6xl keeps it from getting too wide on huge monitors.
           h-full ensures it uses the vertical space.
        */}
        <div className="w-full max-w-6xl h-full shadow-2xl rounded-xl overflow-hidden">
            <ChatInterface />
        </div>
    </div>
  );
}