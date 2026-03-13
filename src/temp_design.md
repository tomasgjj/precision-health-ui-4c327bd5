# LaudoVoz — Design Reference for Lovable

App de laudos medicos por voz. React + TypeScript + Tailwind CSS v4 + Vite.
Abaixo esta o design system completo, mockups ASCII e codigo dos componentes principais.

---

## 1. Layout Overview

### Desktop (lg: breakpoint, >= 1024px)

```
+------------------+--------------------------------------------------+
|                  |                                                  |
|   SIDEBAR        |              MAIN CONTENT                        |
|   Fixed 210px    |              max-w-720px, mx-auto                |
|   Full height    |              pl-[210px], pt-8                    |
|                  |                                                  |
|  +------------+  |  +------------------------------------------+   |
|  | [Logo] App |  |  | Step 1: Selecione o exame                |   |
|  +------------+  |  | [Tab1] [Tab2] [Tab3] [Tab4] ...          |   |
|                  |  +------------------------------------------+   |
|  [Laudos    (3)] |                                                  |
|  [Mascaras     ] |  +------------------------------------------+   |
|  [Config       ] |  | Plan Bar (Free/Pro)                      |   |
|  [Feedback     ] |  | "5 laudos restantes" [===----] [Assinar] |   |
|                  |  +------------------------------------------+   |
|                  |                                                  |
|                  |         +------------------+                     |
|                  |         |                  |                     |
|                  |         |    MIC BUTTON    |                     |
|                  |         |    80x80 px      |                     |
|                  |         |   rounded-2xl    |                     |
|                  |         +------------------+                     |
|                  |                                                  |
|                  |  +------------------------------------------+   |
|                  |  | Step 2: Transcricao                      |   |
|                  |  | +--------------------------------------+ |   |
|                  |  | | textarea placeholder...              | |   |
|                  |  | +--------------------------------------+ |   |
|                  |  |                        [Gerar Laudo ->] | |   |
|                  |  +------------------------------------------+   |
|                  |                                                  |
|  (spacer)        |                                                  |
|                  |                                                  |
|  [Modo claro/    |                                                  |
|   escuro]        |                                                  |
+------------------+--------------------------------------------------+
```

### Mobile (< 1024px)

```
+----------------------------------------------+
| STICKY HEADER (bg-card/85, backdrop-blur)    |
| [Laudos(3)] [Mascaras] [Config] [Feedback]   |
+----------------------------------------------+
|                                              |
|  MAIN CONTENT                                |
|  max-w-680px, mx-auto, px-2.5               |
|                                              |
|  Step 1: Selecione o exame                   |
|  [Tab1] [Tab2] [Tab3] ...  (scroll horiz)   |
|                                              |
|  +----------------------------------------+  |
|  | Plan Bar                               |  |
|  +----------------------------------------+  |
|                                              |
|           +----------------+                 |
|           |   MIC BUTTON   |                 |
|           |    80x80 px    |                 |
|           +----------------+                 |
|                                              |
|  +----------------------------------------+  |
|  | Step 2: Transcricao                    |  |
|  | [textarea]                             |  |
|  |                    [Gerar Laudo ->]    |  |
|  +----------------------------------------+  |
+----------------------------------------------+
```

### Estado de gravacao ativa

```
           +----------------+
           |   STOP ICON    |
           |   80x80 px     |
           | animate-pulse  |
           |   red glow     |
           +----------------+
              01:23 (timer)

    [Trash]    [Pause/Resume]    [Enviar ->]
```

### Estado de laudo gerado (ReportView)

```
+------------------------------------------+
| Paciente: [____________] input           |
+------------------------------------------+
| Secao: "Achados"                         |
| +--------------------------------------+ |
| | texto editavel da secao...           | |
| +--------------------------------------+ |
|                                          |
| Secao: "Impressao"                       |
| +--------------------------------------+ |
| | texto editavel...                    | |
| +--------------------------------------+ |
|                                          |
| [Corrigir] [Salvar] [Copiar] [PDF] [Novo]|
+------------------------------------------+
```

---

## 2. Design System

### Cores — Dark Theme (padrao)

| Token             | Valor                      | Uso                        |
|--------------------|---------------------------|----------------------------|
| `bg-app`          | `#0b1120`                  | Fundo da pagina            |
| `bg-card`         | `#111827`                  | Cards, sidebar, modals     |
| `bg-elevated`     | `#1e293b`                  | Botoes, inputs elevados    |
| `bg-glass`        | `rgba(30,41,59,0.35)`      | Cards transparentes        |
| `bg-input`        | `rgba(15,23,42,0.5)`       | Campos de input            |
| `text-primary`    | `#f1f5f9`                  | Texto principal            |
| `text-secondary`  | `#cbd5e1`                  | Texto secundario           |
| `text-muted`      | `#64748b`                  | Labels, placeholders       |
| `border-subtle`   | `rgba(51,65,85,0.3)`       | Bordas sutis               |
| `border-active`   | `rgba(45,212,191,0.4)`     | Focus de inputs            |
| `brand`           | `#14b8a6` (teal)           | Cor principal da marca     |
| `brand-light`     | `#2dd4bf` (cyan claro)     | Destaques, badges, active  |
| `accent`          | `#6366f1` (indigo)         | Cor de destaque secundaria |

### Cores — Light Theme (classe `.light` no html)

| Token             | Valor                      |
|--------------------|---------------------------|
| `bg-app`          | `#ffffff`                  |
| `bg-card`         | `#ffffff`                  |
| `bg-elevated`     | `#f1f5f9`                  |
| `bg-glass`        | `rgba(255,255,255,0.95)`   |
| `bg-input`        | `#f8fafc`                  |
| `text-primary`    | `#020617`                  |
| `text-secondary`  | `#1e293b`                  |
| `text-muted`      | `#475569`                  |
| `border-subtle`   | `rgba(0,0,0,0.10)`        |
| `border-active`   | `rgba(20,184,166,0.6)`     |

### Gradientes

```css
gradient-brand:  linear-gradient(135deg, #14b8a6, #6366f1)  /* teal -> indigo */
gradient-cyan:   linear-gradient(135deg, #06b6d4, #3b82f6)  /* cyan -> blue (botoes primarios) */
gradient-green:  linear-gradient(135deg, #22c55e, #16a34a)  /* verde */
gradient-purple: linear-gradient(135deg, #6366f1, #8b5cf6)  /* roxo */
```

### Tipografia

- **Fonte**: `'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `text-[9px] font-bold` — badges, tags pequenas
- `text-[10px] font-bold` — step indicators (circulos numerados)
- `text-[11px] font-semibold uppercase tracking-wider` — labels de secao, plano
- `text-xs (12px) font-semibold` — botoes pequenos, mobile header
- `text-sm (14px) font-medium` — botoes sidebar, corpo
- `text-base (16px) font-bold` — titulo "LaudoVoz", titulos de modal
- `text-xl font-bold` — timer de gravacao

### Espacamentos padrao

- Padding de cards: `p-3 sm:p-4` ou `p-5`
- Gap entre itens: `gap-1`, `gap-1.5`, `gap-2`, `gap-2.5`
- Margin bottom entre blocos: `mb-3`, `mb-3.5`, `mb-4.5`
- Sidebar padding: `p-5 px-3.5`

### Bordas e cantos

- `rounded-lg` (8px) — botoes, badges
- `rounded-xl` (12px) — cards, inputs, modals, mic button
- `rounded-2xl` (16px) — mic button
- `rounded-full` — step indicators (circulos)
- `rounded-md` (6px) — tags internas

### Sombras

- Mic button idle: `shadow-[0_4px_20px_rgba(0,0,0,.3),0_0_0_1px_rgba(45,212,191,.15)]`
- Mic button hover: `shadow-[0_4px_24px_rgba(0,0,0,.4),0_0_0_1px_rgba(45,212,191,.3)]`
- Mic recording: `shadow-[0_4px_20px_rgba(0,0,0,.3),0_0_0_2px_rgba(239,68,68,.5)]`
- Modal: `shadow-2xl`

### Animacoes

- `animate-fade-in` — fade + translateY(6px) em 0.35s
- `animate-slide-up` — fade + translateY(20px) em 0.2s (modals)
- `animate-pulse-red` — pulsacao vermelha (gravando)
- `animate-pulse-yellow` — pulsacao amarela (transcrevendo)
- `animate-shimmer` — skeleton loading
- Transicoes padrao: `transition-colors duration-150`, `transition-all duration-200`

### Icones

- **Biblioteca**: `lucide-react`
- Sidebar desktop: `size={18}`
- Mobile header: `size={16}`
- Icones usados: `ClipboardList`, `FileText`, `Settings`, `MessageSquare`, `Sun`, `Moon`, `Mic`, `Square` (stop), `Pause`, `Play`, `Trash2`, `Send`, `Clock`, `PenLine`, `X`

---

## 3. Componentes — Codigo JSX + Tailwind

### 3.1 Sidebar (Desktop)

```tsx
// Sidebar fixa a esquerda, visivel apenas em desktop (lg:)
<div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[210px] bg-bg-card/95 backdrop-blur-xl border-r border-border-subtle z-[99] flex-col p-5 px-3.5 gap-1">

  {/* Logo */}
  <div className="flex items-center gap-2.5 px-2.5 py-2 mb-4">
    <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
      {/* Icone de microfone SVG */}
    </div>
    <span className="font-bold text-base text-text-primary">LaudoVoz</span>
  </div>

  {/* Botoes de navegacao */}
  <SidebarButton icon={<ClipboardList size={18} />} label="Laudos" active badge={3} />
  <SidebarButton icon={<FileText size={18} />} label="Mascaras" />
  <SidebarButton icon={<Settings size={18} />} label="Configuracoes" />
  <SidebarButton icon={<MessageSquare size={18} />} label="Feedback" />

  <div className="flex-1" /> {/* Spacer */}

  {/* Theme toggle no fundo */}
  <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium border-none w-full text-left transition-colors duration-150 bg-transparent text-text-muted hover:bg-bg-elevated hover:text-text-primary">
    <Sun size={18} />
    Modo claro
  </button>
</div>
```

### 3.2 SidebarButton

```tsx
// Estado ativo: fundo teal transparente + texto teal
// Estado inativo: transparente + texto cinza, hover eleva
function SidebarButton({ icon, label, active, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium border-none w-full text-left transition-colors duration-150
        ${active
          ? 'bg-brand-light/12 text-brand-light'
          : 'bg-transparent text-text-muted hover:bg-bg-elevated hover:text-text-primary'
        }`}
    >
      <span className="w-5.5 flex justify-center">{icon}</span>
      {label}
      {badge ? (
        <span className="ml-auto bg-brand text-white text-[9px] font-bold px-1.5 py-0.5 rounded-lg">
          {badge}
        </span>
      ) : null}
    </button>
  )
}
```

### 3.3 Mobile Header

```tsx
// Header sticky no topo, visivel apenas em mobile (< lg)
<header className="lg:hidden bg-bg-card/85 backdrop-blur-xl border-b border-border-subtle px-3 sm:px-5 py-2.5 sm:py-3.5 sticky top-0 z-[100] flex items-center justify-center">
  <div className="flex gap-1.5 items-center">
    <HeaderBtn icon={<ClipboardList size={16} />} label="Laudos" badge={3} active />
    <HeaderBtn icon={<FileText size={16} />} label="Mascaras" />
    <HeaderBtn icon={<Settings size={16} />} label="Config" />
    <HeaderBtn icon={<MessageSquare size={16} />} label="Feedback" />
  </div>
</header>
```

### 3.4 HeaderBtn (Mobile)

```tsx
function HeaderBtn({ icon, label, badge, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg cursor-pointer text-[11px] sm:text-xs font-semibold border whitespace-nowrap transition-colors duration-150
        ${active
          ? 'border-brand-light/25 bg-brand-light/8 text-brand-light'
          : 'border-border-subtle bg-bg-glass text-text-muted hover:bg-brand-light/8 hover:border-brand-light/25 hover:text-brand-light'
        }`}
    >
      {icon} <span>{label}</span>
      {badge ? (
        <span className="ml-0.5 bg-brand text-white text-[9px] font-bold px-1 py-px rounded-lg">
          {badge}
        </span>
      ) : null}
    </button>
  )
}
```

### 3.5 ExamTabs (selecao de exame)

```tsx
// Tabs horizontais scrollaveis para selecao de exame
<div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4.5 overflow-x-auto pb-1 scrollbar-none">
  {exams.map((e) => (
    <button
      key={e}
      className={`px-2 sm:px-4.5 py-2 sm:py-2.5 rounded-xl cursor-pointer text-[11px] sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 border
        ${e === selected
          ? 'border-brand-light/40 bg-brand-light/12 text-brand-light'
          : 'border-border-subtle bg-bg-glass text-text-muted hover:bg-brand-light/5 hover:border-brand-light/20'
        }`}
    >
      {e}
    </button>
  ))}
</div>
```

### 3.6 Recorder (gravador de voz)

```tsx
// Botao de microfone centralizado
<div className="flex flex-col items-center my-4 sm:my-7">
  <button
    className={`w-20 h-20 rounded-2xl cursor-pointer flex items-center justify-center transition-all duration-300 border-none
      ${recording
        ? 'bg-bg-elevated shadow-[0_4px_20px_rgba(0,0,0,.3),0_0_0_2px_rgba(239,68,68,.5)] animate-pulse-red'
        : transcribing
          ? 'bg-bg-elevated shadow-[0_4px_20px_rgba(0,0,0,.3),0_0_0_2px_rgba(245,158,11,.5)] animate-pulse-yellow'
          : 'bg-bg-elevated shadow-[0_4px_20px_rgba(0,0,0,.3),0_0_0_1px_rgba(45,212,191,.15)] hover:scale-105'
      }`}
  >
    {recording ? <Square /> : transcribing ? <Clock /> : <Mic />}
  </button>
  {recording && <div className="text-xl font-bold text-red-400 mt-1.5 tabular-nums">01:23</div>}
</div>

// Area de texto (quando nao esta gravando)
<div className="bg-bg-glass border border-border-subtle rounded-xl p-3 sm:p-4 mb-3.5">
  <div className="flex items-center gap-2 mb-2">
    <div className="w-5.5 h-5.5 rounded-full bg-brand-light/12 border border-brand-light/30 flex items-center justify-center text-[10px] font-bold text-brand-light">2</div>
    <label className="text-[11px] text-text-muted uppercase tracking-wider font-bold">Transcricao</label>
  </div>
  <textarea rows={3} placeholder="Grave ou digite a descricao..."
    className="w-full bg-bg-input border border-border-subtle rounded-md text-sm p-2.5 text-text-primary resize-none focus:border-brand-light/40 outline-none" />
  <div className="flex justify-end mt-2">
    <button className="flex items-center gap-1.5 px-4.5 py-1.5 rounded-lg gradient-cyan text-white text-xs font-semibold border-none hover:-translate-y-px hover:shadow-md">
      <Send size={14} /> Gerar Laudo
    </button>
  </div>
</div>
```

### 3.7 PlanBar (barra de plano)

```tsx
// Plano gratuito
<div className="bg-bg-glass border border-border-subtle rounded-xl p-3 px-4 mb-3.5 flex items-center justify-between gap-2.5">
  <div className="flex flex-col gap-0.5 flex-1">
    <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wide">Plano Gratuito</span>
    <div className="text-sm font-bold text-text-primary">
      <span className="text-brand-light">5</span> laudos restantes de 10
    </div>
    <div className="w-full h-1.5 bg-bg-elevated/50 rounded-sm mt-1 overflow-hidden">
      <div className="h-full rounded-sm" style={{ width: '50%', background: '#4ade80' }} />
    </div>
  </div>
  <button className="px-4 py-2 rounded-lg gradient-brand text-white text-xs font-bold border-none cursor-pointer whitespace-nowrap shrink-0">
    Assinar Pro
  </button>
</div>

// Plano Pro
<div className="bg-bg-glass border border-indigo-500/25 rounded-xl p-2 px-3.5 mb-3.5 flex items-center justify-between gap-2.5">
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wide">Plano</span>
      <span className="inline-block px-2 py-0.5 rounded-md gradient-brand text-white text-[9px] font-bold uppercase tracking-wide">Pro</span>
    </div>
    <span className="text-[11px] text-indigo-300 mt-0.5">Laudos ilimitados</span>
  </div>
</div>
```

### 3.8 Modal (componente base)

```tsx
// Backdrop
<div className="fixed inset-0 z-200 flex justify-center items-start p-3.5 overflow-y-auto bg-black/65 backdrop-blur-sm">
  {/* Modal container */}
  <div className="bg-bg-card border border-border-subtle rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
      <div className="flex items-center gap-2.5">
        <span className="text-brand">{/* icon */}</span>
        <h2 className="text-base font-semibold text-text-primary">Titulo</h2>
      </div>
      <button className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors cursor-pointer">
        <X size={18} />
      </button>
    </div>
    {/* Body */}
    <div className="p-5">{/* children */}</div>
    {/* Footer (optional) */}
    <div className="px-5 py-4 border-t border-border-subtle">{/* footer */}</div>
  </div>
</div>
```

### 3.9 Step Indicators (circulos numerados)

```tsx
// Circulo com numero do step
<div className="flex items-center gap-2 mb-1.5">
  <div className="w-5.5 h-5.5 rounded-full bg-brand-light/12 border border-brand-light/30 flex items-center justify-center text-[10px] font-bold text-brand-light shrink-0">
    1
  </div>
  <span className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
    Selecione o exame
  </span>
</div>
```

### 3.10 Main Layout (App wrapper)

```tsx
// Container principal com offset do sidebar
<main className="max-w-[680px] lg:max-w-[720px] mx-auto px-2.5 sm:px-4 py-3 sm:py-4.5 lg:pl-[210px] lg:pt-8">
  {/* Step 1 + ExamTabs */}
  {/* PlanBar */}
  {/* Recorder OR ReportView */}
</main>
```

---

## 4. Estrutura e Fluxo do App

### Fluxo de navegacao

```
Login/Signup -> [MFA Verify] -> App Principal
                                  |
                                  +-- Sidebar (desktop) / Header (mobile)
                                  |
                                  +-- Main Content:
                                  |     Step 1: ExamTabs (selecao de exame)
                                  |     PlanBar (free/pro)
                                  |     Step 2: Recorder (mic + texto)
                                  |       -> Gerar Laudo
                                  |       -> ReportView (resultado editavel)
                                  |
                                  +-- Modals (overlay):
                                        - Laudos (historico de laudos salvos)
                                        - Mascaras (templates de laudo)
                                        - Configuracoes (perfil, 2FA, assinatura)
                                        - Feedback (formulario)
                                        - Onboarding (primeiro acesso)
```

### Resumo visual do app

O app e escuro por padrao com acentos em teal/cyan. Interface limpa e minimalista.
A sidebar e discreta com icones + texto. O conteudo principal e centralizado e focado
no workflow de 2 steps: (1) selecionar exame, (2) gravar/digitar e gerar laudo.
Botoes primarios usam gradiente cyan->blue. Badges usam teal solido.
Cards usam fundo glass com bordas sutis. Modals entram com slide-up animado.

### Logo SVG

```svg
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <rect x="9" y="1.5" width="6" height="13" rx="3" fill="currentColor" />
  <path d="M6 13c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <line x1="12" y1="17.5" x2="12" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  <line x1="9.5" y1="19.5" x2="14.5" y2="19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
```
