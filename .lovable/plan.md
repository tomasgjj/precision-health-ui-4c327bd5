

## Plano de Implementação

### 1. Converter modais em páginas inline

**Problema**: Settings, History, Feedback e MaskEditor são modais empilhados sobre o conteúdo. O padrão correto é navegação por tabs.

**Mudanças**:
- Expandir o tipo `Tab` para `"laudos" | "historico" | "mascaras" | "config"`
- Feedback vira uma seção dentro de Config
- `AppDashboard.tsx`: renderizar condicionalmente no `<main>` baseado em `activeTab` — sem modais
- Remover wrappers de overlay (`fixed inset-0 bg-background/80`) dos 4 componentes, transformando-os em componentes de página com scroll normal
- `Sidebar.tsx` e `MobileHeader.tsx`: atualizar nav para 4 tabs — Laudos (FileText), Histórico (Clock), Máscaras (LayoutTemplate), Config (Settings)

### 2. Dashboard de métricas

Criar `DashboardView.tsx` exibido como seção no topo da tab "laudos", acima do Recorder.

**Cards** (dados mock, estilo Raycast — `bg-card border border-border`):

| Card | Valor | Ícone |
|------|-------|-------|
| Laudos hoje | 7 | FileText |
| Tempo médio | 2:34 | Clock |
| Streak | 5 dias | Flame |

**Por tipo/máscara** — lista compacta com dot colorido + contagem:
- USG Abdome: 4
- Tireoide: 2  
- USG Mama: 1

**Mini bar chart** — últimos 7 dias com divs simples (sem lib externa).

### 3. Barra de ações fixa no mobile (ReportView)

Quando `useIsMobile()` é true e o laudo está gerado, os botões Salvar/Copiar/PDF ficam em uma barra fixa `fixed bottom-14` (acima da tab bar de 56px), com `bg-card border-t border-border`. Os botões inline são removidos no mobile.

### 4. Exportar PDF estilizado

Adicionar `jspdf` como dependência. No botão PDF do `ReportView`:
- Gerar PDF com cabeçalho (nome do médico, CRM, data)
- Corpo do laudo formatado por seções
- Rodapé com assinatura digital (se configurada)
- Download automático do arquivo

### 5. Empty states

- **Histórico vazio**: ícone ClipboardList + "Grave seu primeiro laudo e ele aparecerá aqui"
- **Sem máscaras customizadas**: mensagem educativa com botão para criar

---

### Arquivos modificados/criados

| Arquivo | Ação |
|---------|------|
| `src/pages/AppDashboard.tsx` | Refatorar — tabs inline, sem modais |
| `src/components/app/DashboardView.tsx` | **Novo** — cards de métricas |
| `src/components/app/Sidebar.tsx` | Atualizar nav items (4 tabs) |
| `src/components/app/MobileHeader.tsx` | Atualizar bottom nav (4 tabs) |
| `src/components/app/SettingsModal.tsx` | Converter para página inline (sem overlay) + incluir seção Feedback |
| `src/components/app/HistoryModal.tsx` | Converter para página inline (sem overlay) |
| `src/components/app/MaskEditor.tsx` | Converter para página inline (sem overlay fullscreen) |
| `src/components/app/FeedbackModal.tsx` | Remover — conteúdo vai para dentro de Settings |
| `src/components/app/ReportView.tsx` | Barra fixa no mobile + PDF real com jspdf |

