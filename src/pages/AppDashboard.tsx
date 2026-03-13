import { useState } from "react";
import Sidebar from "@/components/app/Sidebar";
import MobileHeader from "@/components/app/MobileHeader";
import ExamTabs from "@/components/app/ExamTabs";
import PlanBar from "@/components/app/PlanBar";
import Recorder from "@/components/app/Recorder";
import ReportView from "@/components/app/ReportView";

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

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 max-w-4xl mx-auto w-full">
          {activeTab === "laudos" && (
            <div className="space-y-6 animate-fade-in">
              {/* Step indicator */}
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-foreground">
                  {reportGenerated ? "Laudo Gerado" : "Novo Laudo"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {reportGenerated
                    ? "Revise e edite o laudo antes de salvar"
                    : "Selecione o exame e grave ou cole a descrição"}
                </p>
              </div>

              {/* Exam tabs */}
              {!reportGenerated && (
                <ExamTabs selected={selectedExam} onSelect={setSelectedExam} />
              )}

              {/* Plan bar */}
              <PlanBar used={7} total={15} plan="free" />

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
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-foreground mb-2">Máscaras</h1>
              <p className="text-sm text-muted-foreground">
                Gerencie seus modelos de laudo personalizados. Em breve!
              </p>
            </div>
          )}

          {activeTab === "config" && (
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-foreground mb-2">Configurações</h1>
              <p className="text-sm text-muted-foreground">
                Preferências de conta e personalização. Em breve!
              </p>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-foreground mb-2">Feedback</h1>
              <p className="text-sm text-muted-foreground">
                Envie sugestões ou reporte problemas. Em breve!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
