

# LaudoVoz — App Principal (Dashboard)

Vou implementar a interface principal do app baseada no design reference que você enviou. Isso inclui o layout com sidebar, o fluxo de gravação de laudos, e todos os componentes descritos no documento.

## Arquitetura

```text
/app (nova rota)
├── AppLayout (sidebar + main)
│   ├── Sidebar (desktop, fixed 210px)
│   ├── MobileHeader (sticky, < lg)
│   └── MainContent
│       ├── StepIndicator + ExamTabs
│       ├── PlanBar (free/pro)
│       ├── Recorder (mic button + textarea)
│       └── ReportView (laudo gerado)
```

## Arquivos a criar

1. **`src/pages/App.tsx`** — Página principal com layout sidebar + conteúdo
2. **`src/components/app/Sidebar.tsx`** — Sidebar fixa desktop com logo, nav buttons, theme toggle
3. **`src/components/app/MobileHeader.tsx`** — Header sticky mobile com botões de nav
4. **`src/components/app/ExamTabs.tsx`** — Tabs horizontais scrolláveis para seleção de exame (USG Abdome, Tireoide, Mama, etc.)
5. **`src/components/app/PlanBar.tsx`** — Barra de plano Free/Pro com progress bar
6. **`src/components/app/Recorder.tsx`** — Botão de microfone 80x80, timer, controles de gravação, textarea de transcrição, botão "Gerar Laudo"
7. **`src/components/app/ReportView.tsx`** — Visualização do laudo gerado com seções editáveis (Achados, Impressão), campo paciente, e ações (Corrigir, Salvar, Copiar, PDF, Novo)

## Rota

Adicionar `/app` no `App.tsx` apontando para a nova página.

## Design aplicado

- Sidebar: `w-[210px]`, `bg-card/95`, `backdrop-blur-xl`, botões com estado ativo teal (`bg-brand-light/12 text-brand-light`)
- Mic button: `w-20 h-20 rounded-2xl`, shadows customizadas, estados idle/recording/transcribing
- ExamTabs: `rounded-xl`, border ativo teal, glass background
- PlanBar: glass surface, progress bar verde, botão "Assinar Pro" com `gradient-brand`
- Todas as cores e tokens do design system já configurado
- Animações: `animate-fade-in`, `animate-slide-up`, `animate-pulse` para gravação

## Estado local

Gerenciado com `useState` no `App.tsx`:
- `activeTab`: navegação sidebar (laudos, mascaras, config, feedback)
- `selectedExam`: exame selecionado
- `recording` / `transcribing`: estado do gravador
- `reportGenerated`: alterna entre Recorder e ReportView

## Notas

- Sem backend real por enquanto — mock de dados e simulação de gravação com timer
- Theme toggle preparado mas sem persistência ainda
- Layout responsivo: sidebar desktop, header mobile conforme o design doc

