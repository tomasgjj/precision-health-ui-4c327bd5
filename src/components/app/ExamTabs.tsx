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
    <div className="w-full overflow-x-auto scrollbar-none">
      <div className="flex gap-2 pb-1 min-w-max">
        {exams.map((exam) => {
          const active = selected === exam;
          return (
            <button
              key={exam}
              onClick={() => onSelect(exam)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150",
                active
                  ? "surface-glass border-brand-light/40 text-brand-light shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent"
              )}
              style={active ? { borderColor: "hsl(var(--color-brand-light) / 0.4)" } : undefined}
            >
              {exam}
            </button>
          );
        })}
      </div>
    </div>
  );
}
