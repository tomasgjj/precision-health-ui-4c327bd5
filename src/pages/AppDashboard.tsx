import { useState } from "react";
import Sidebar from "@/components/app/Sidebar";
import MobileHeader from "@/components/app/MobileHeader";
import ExamTabs from "@/components/app/ExamTabs";
import PlanBar from "@/components/app/PlanBar";
import Recorder from "@/components/app/Recorder";
import ReportView from "@/components/app/ReportView";
import { FileText, LayoutTemplate, Settings, MessageSquare, ArrowRight } from "lucide-react";

type Tab = "laudos" | "mascaras" | "config" | "feedback";

export default function AppDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("laudos");
  const [selectedExam, setSelectedExam] = useState("USG Abdome");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleGenerate = (text: string) => {
    setTranscription(text);
    setReportGenerated(true);
  };

  const handleNewReport = () => {
    setReportGenerated(false);
    setTranscription("");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Top bar */}
        <div className="hidden lg:flex items-center h-12 px-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span>LaudoVoz</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              {activeTab === "laudos" && (reportGenerated ? "Laudo Gerado" : "Novo Laudo")}
              {activeTab === "mascaras" && "Máscaras"}
              {activeTab === "config" && "Configurações"}
              {activeTab === "feedback" && "Feedback"}
            </span>
          </nav>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 max-w-3xl mx-auto w-full pb-20 lg:pb-6">
          {activeTab === "laudos" && (
            <div className="space-y-5 animate-fade-in">
              {/* Header */}
              <div className="space-y-0.5">
                <h1 className="text-lg font-bold text-foreground tracking-tight">
                  {reportGenerated ? "Laudo Gerado" : "Novo Laudo"}
                </h1>
                <p className="text-[13px] text-muted-foreground">
                  {reportGenerated
                    ? "Revise, edite e salve o laudo"
                    : "Selecione o exame e grave ou digite a descrição"}
                </p>
              </div>

              {/* Plan bar */}
              <PlanBar used={7} total={15} plan="free" />

              {/* Exam tabs */}
              {!reportGenerated && (
                <ExamTabs selected={selectedExam} onSelect={setSelectedExam} />
              )}

              {/* Main content */}
              {reportGenerated ? (
                <ReportView
                  transcription={transcription}
                  onNewReport={handleNewReport}
                />
              ) : (
                <Recorder onGenerate={handleGenerate} />
              )}
            </div>
          )}

          {activeTab === "mascaras" && (
            <EmptyState
              icon={LayoutTemplate}
              title="Máscaras"
              description="Gerencie seus modelos de laudo personalizados."
              badge="Em breve"
            />
          )}

          {activeTab === "config" && (
            <EmptyState
              icon={Settings}
              title="Configurações"
              description="Preferências de conta e personalização."
              badge="Em breve"
            />
          )}

          {activeTab === "feedback" && (
            <EmptyState
              icon={MessageSquare}
              title="Feedback"
              description="Envie sugestões ou reporte problemas."
              badge="Em breve"
            />
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h1 className="text-lg font-bold text-foreground mb-1">{title}</h1>
      <p className="text-[13px] text-muted-foreground mb-3">{description}</p>
      {badge && (
        <span className="text-[11px] font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
