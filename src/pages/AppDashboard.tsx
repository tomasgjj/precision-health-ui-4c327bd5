import { useState } from "react";
import Sidebar from "@/components/app/Sidebar";
import MobileHeader from "@/components/app/MobileHeader";
import ExamTabs from "@/components/app/ExamTabs";
import PlanBar from "@/components/app/PlanBar";
import Recorder from "@/components/app/Recorder";
import ReportView from "@/components/app/ReportView";
import SettingsModal from "@/components/app/SettingsModal";
import HistoryModal from "@/components/app/HistoryModal";
import FeedbackModal from "@/components/app/FeedbackModal";
import MaskEditor from "@/components/app/MaskEditor";
import { ArrowRight } from "lucide-react";

type Tab = "laudos" | "mascaras" | "config" | "feedback";

export default function AppDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("laudos");
  const [selectedExam, setSelectedExam] = useState("USG Abdome");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [transcription, setTranscription] = useState("");

  // Modal states
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMasks, setShowMasks] = useState(false);

  const handleGenerate = (text: string) => {
    setTranscription(text);
    setReportGenerated(true);
  };

  const handleNewReport = () => {
    setReportGenerated(false);
    setTranscription("");
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === "config") {
      setShowSettings(true);
    } else if (tab === "feedback") {
      setShowFeedback(true);
    } else if (tab === "mascaras") {
      setShowMasks(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Top bar */}
        <div className="hidden lg:flex items-center h-12 px-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span>LaudoVoz</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              {reportGenerated ? "Laudo Gerado" : "Novo Laudo"}
            </span>
          </nav>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 max-w-3xl mx-auto w-full pb-20 lg:pb-6">
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
        </main>
      </div>

      {/* Modals */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
      {showMasks && <MaskEditor onClose={() => setShowMasks(false)} />}
    </div>
  );
}
