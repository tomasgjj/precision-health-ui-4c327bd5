import { cn } from "@/lib/utils";

const exams = [
  { id: "USG Abdome", emoji: "🫁" },
  { id: "Tireoide", emoji: "🦋" },
  { id: "Mama", emoji: "🩺" },
  { id: "Pélvica", emoji: "🔬" },
  { id: "Obstétrica", emoji: "🤰" },
  { id: "Vias Urinárias", emoji: "💧" },
  { id: "Partes Moles", emoji: "🔍" },
  { id: "Cervical", emoji: "📋" },
];

interface ExamTabsProps {
  selected: string;
  onSelect: (exam: string) => void;
}

export default function ExamTabs({ selected, onSelect }: ExamTabsProps) {
  return (
    <div className="w-full">
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2 block">
        Tipo de Exame
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {exams.map((exam) => {
          const active = selected === exam.id;
          return (
            <button
              key={exam.id}
              onClick={() => onSelect(exam.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-100 border",
                active
                  ? "bg-secondary border-primary/30 text-foreground shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <span className="text-sm">{exam.emoji}</span>
              <span className="truncate">{exam.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
