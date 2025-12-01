import TerminalSection from "@/components/TerminalSection";

export default function Page() {
  return (
    <main className="w-full h-screen overflow-hidden p-2 grid grid-cols-4 gap-3 content-stretch">
      <TerminalSection terminalName="Manco Cápac" slug="manco-capac" />
      <TerminalSection terminalName="Guadalupe" slug="guadalupe" />
      <TerminalSection terminalName="DPW" slug="dpw" />
      <TerminalSection terminalName="Atalaya" slug="atalaya" />

      <div className="col-span-4 flex justify-center mt-2">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow hover:bg-blue-700">
          Actualizar
        </button>
      </div>
    </main>
  );
}
