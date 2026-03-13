import { useState } from "react";
import Sidebar from "@/components/app/Sidebar";
import MobileHeader from "@/components/app/MobileHeader";
import ExamTabs from "@/components/app/ExamTabs";
import PlanBar from "@/components/app/PlanBar";
import Recorder from "@/components/app/Recorder";
import ReportView from "@/components/app/ReportView";
import SettingsPage from "@/components/app/SettingsPage";
import HistoryPage from "@/components/app/HistoryPage";
import MaskEditorPage from "@/components/app/MaskEditorPage";
import DashboardView from "@/components/app/DashboardView";

type Tab = "laudos" | "historico" | "mascaras" | "config";

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

        {/* Desktop header */}
        <div className="hidden lg:flex items-center h-[52px] px-6 border-b border-border">
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span>LaudoVoz</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-foreground font-medium">
              {activeTab === "laudos" && (reportGenerated ? "Laudo Gerado" : "Novo Laudo")}
              {activeTab === "historico" && "Histórico"}
              {activeTab === "mascaras" && "Máscaras"}
              {activeTab === "config" && "Configurações"}
            </span>
          </nav>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-5 lg:py-6 max-w-3xl mx-auto w-full pb-20 lg:pb-6">
          {activeTab === "laudos" && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-0.5">
                <h1 className="text-lg font-semibold text-foreground tracking-tight">
                  {reportGenerated ? "Laudo Gerado" : "Novo Laudo"}
                </h1>
                <p className="text-[13px] text-muted-foreground">
                  {reportGenerated
                    ? "Revise, edite e salve o laudo gerado"
                    : "Selecione o exame e grave ou digite a descrição"}
                </p>
              </div>

              <PlanBar used={7} total={15} plan="free" />

              <DashboardView />

              {!reportGenerated && (
                <ExamTabs selected={selectedExam} onSelect={setSelectedExam} />
              )}

              {reportGenerated ? (
                <ReportView transcription={transcription} onNewReport={handleNewReport} />
              ) : (
                <Recorder onGenerate={handleGenerate} />
              )}
            </div>
          )}

          {activeTab === "historico" && <HistoryPage />}
          {activeTab === "mascaras" && <MaskEditorPage />}
          {activeTab === "config" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
