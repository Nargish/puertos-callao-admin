import { getTerminalByName, getLanesForTerminal } from "@/lib/queries";
import LaneCard from "@/components/LaneCard";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

const SLUG_MAP: Record<string, string> = {
  "manco-capac": "Manco Cápac",
  guadalupe: "Guadalupe",
  dpw: "DPW",
  apm: "APM",
};

export default async function TerminalPage({ params }: Params) {
  // 🔥 Next.js 16 requires awaiting params
  const { id: slug } = await params;

  const name = SLUG_MAP[slug];

  if (!name) {
    return <div className="p-8 text-red-600">Terminal inválido.</div>;
  }

  const { data: terminal } = await getTerminalByName(name);
  if (!terminal) {
    return <div className="p-8 text-red-600">Terminal no encontrado.</div>;
  }

  const { data: lanes } = await getLanesForTerminal(terminal.id);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        {terminal.name}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {lanes?.map((lane) => (
          <LaneCard key={lane.id} lane={lane} />
        ))}
      </div>
    </main>
  );
}
