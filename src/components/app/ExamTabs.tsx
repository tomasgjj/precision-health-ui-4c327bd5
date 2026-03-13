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
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center text-[9px] font-bold text-primary shrink-0">
          1
        </div>
        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.08em]">
          Tipo de Exame
        </label>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-4 sm:gap-1.5 sm:overflow-visible">
        {exams.map((exam) => {
          const active = selected === exam;
          return (
            <button
              key={exam}
              onClick={() => onSelect(exam)}
              className={cn(
                "px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150 border whitespace-nowrap shrink-0",
                active
                  ? "bg-secondary border-primary/30 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {exam}
            </button>
          );
        })}
      </div>
    </div>
  );
}
