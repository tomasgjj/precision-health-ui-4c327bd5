import { cn } from "@/lib/utils";

const exams = [
  "USG Abdome",
  "Tireoide",
  "Mama",
  "Pélvica",
  "Obstétrica",
  "Vias Urinárias",
  "Partes Moles",
  "Cervical",
];

interface ExamTabsProps {
  selected: string;
  onSelect: (exam: string) => void;
}

export default function ExamTabs({ selected, onSelect }: ExamTabsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
          1
        </div>
        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
          Tipo de Exame
        </label>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-4 sm:gap-2 sm:overflow-visible">
        {exams.map((exam) => {
          const active = selected === exam.id;
          return (
            <button
              key={exam.id}
              onClick={() => onSelect(exam.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px] sm:text-[13px] font-medium transition-all duration-200 border whitespace-nowrap shrink-0",
                active
                  ? "bg-primary/10 border-primary/30 text-foreground shadow-sm glow-primary-sm"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/40 hover:border-border"
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
