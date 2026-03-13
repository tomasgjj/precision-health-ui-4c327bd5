# LaudoVoz — Especificação Visual e Funcional Completa

> **Propósito**: Este documento descreve 1:1 o design e comportamento de todas as telas do LaudoVoz para que qualquer IA (Claude Code, Cursor, etc.) consiga replicar ou modificar o projeto sem reinterpretar a identidade visual.

## 0. Screenshots de Referência (Estado Atual)

Todas as capturas estão em `public/screenshots/`. Use como referência visual obrigatória:

| # | Arquivo | Tela |
|---|---------|------|
| 01 | `01-landing-hero.png` | Landing page — Hero + Navbar |
| 02 | `02-landing-footer.png` | Landing page — CTA + Footer |
| 03 | `03-login.png` | Página de Login (split-screen) |
| 04 | `04-2fa.png` | Verificação 2FA |
| 05 | `05-app-laudos.png` | App — Aba Laudos (tela principal) |
| 06 | `06-app-dashboard-top.png` | App — Dashboard (KPIs + gráficos) |
| 07 | `07-app-dashboard-bottom.png` | App — Dashboard (heatmap + distribuição) |
| 08 | `08-app-historico.png` | App — Histórico de laudos |
| 09 | `09-app-mascaras.png` | App — Editor de Máscaras |
| 10 | `10-app-configuracoes.png` | App — Configurações |

> ⚠️ **REGRA**: Qualquer alteração visual DEVE manter consistência com estes screenshots. Não reinterpretar cores, espaçamentos ou layout.

---

## 1. Sistema de Design

### 1.1 Estética Geral
- **Inspiração**: Raycast, Linear, Stripe — ultra-dark, premium, minimalista
- **Superfícies**: Sólidas, monocromáticas. Sem glassmorphism excessivo
- **Bordas**: 1px de alto contraste (`border-border`)
- **Efeitos**: Glow sutil via `drop-shadow` em textos e botões principais
- **Ícones**: Todos são **Lucide React**, tamanho padrão 14-15px no app, 18-20px em headings

### 1.2 Tipografia
```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- **Hero**: `clamp(2.5rem, 5vw, 4.5rem)` — line-height 1.05, letter-spacing -0.04em, weight 700
- **Section titles**: `clamp(1.75rem, 3vw, 2.5rem)` — line-height 1.15, letter-spacing -0.03em, weight 700
- **Body no app**: 13px (text-[13px])
- **Labels**: `text-[11px] text-muted-foreground font-semibold` ou `font-medium uppercase tracking-wider`
- **Micro labels**: `text-[10px] text-muted-foreground`

### 1.3 Tokens de Cor (CSS Variables — HSL sem `hsl()` wrapper)

#### Tema Dark (Midnight) — Padrão
```css
--background: 0 0% 2%;
--foreground: 0 0% 93%;
--card: 0 0% 5%;
--card-foreground: 0 0% 93%;
--primary: 217 91% 60%;          /* Azul brand */
--primary-foreground: 0 0% 100%;
--secondary: 0 0% 8%;
--secondary-foreground: 0 0% 60%;
--muted: 0 0% 7%;
--muted-foreground: 0 0% 38%;
--accent: 258 80% 62%;           /* Roxo/Indigo */
--accent-foreground: 0 0% 100%;
--destructive: 0 62% 55%;
--destructive-foreground: 0 0% 98%;
--border: 0 0% 10%;
--input: 0 0% 7%;
--ring: 217 91% 60%;
--radius: 0.625rem;
--success: 142 50% 45%;
--success-foreground: 0 0% 100%;
--info: 200 60% 50%;
--warning: 38 90% 55%;

/* Sidebar */
--sidebar-background: 0 0% 1.5%;
--sidebar-foreground: 0 0% 38%;
--sidebar-primary: 217 91% 60%;
--sidebar-accent: 0 0% 8%;
--sidebar-border: 0 0% 9%;

/* Glass (uso limitado) */
--bg-glass: 0 0% 8% / 0.5;
--bg-glass-hover: 0 0% 10% / 0.6;
--bg-input-glass: 0 0% 4% / 0.8;
--border-subtle: 0 0% 12% / 0.4;
--border-active: 217 91% 60% / 0.4;
```

#### Tema Ocean
```css
--background: 215 35% 5%;
--foreground: 210 20% 92%;
--card: 215 30% 8%;
--primary: 210 100% 56%;
--secondary: 215 25% 12%;
--muted: 215 25% 10%;
--muted-foreground: 210 15% 40%;
--accent: 190 80% 50%;           /* Teal */
--border: 215 20% 14%;
--sidebar-background: 215 35% 4%;
```

#### Tema Light
```css
--background: 0 0% 98%;
--foreground: 0 0% 10%;
--card: 0 0% 100%;
--primary: 217 91% 50%;
--secondary: 0 0% 94%;
--muted: 0 0% 95%;
--muted-foreground: 0 0% 45%;
--accent: 258 65% 55%;
--border: 0 0% 88%;
--sidebar-background: 0 0% 97%;
```

### 1.4 Utility Classes Customizadas (definidas em index.css)

| Classe | Descrição |
|--------|-----------|
| `surface-card` | `bg-card` + `border 1px border-border` |
| `surface-glass` | Background semi-transparente `hsl(var(--bg-glass))` + border sutil |
| `surface-glass-strong` | Versão mais opaca do glass |
| `surface-card-hover` | Card com hover que muda border para `--border-active` |
| `gradient-brand` | `linear-gradient(135deg, primary → accent)` |
| `gradient-cyan` | `linear-gradient(135deg, primary → color-blue)` |
| `gradient-landing` | `linear-gradient(135deg, color-blue → accent)` |
| `gradient-green` | Verde sólido gradiente |
| `gradient-purple` | `accent → purple` |
| `text-gradient` | Texto gradient branco → cinza (landing hero) |
| `text-gradient-brand` | Texto gradient primary → accent |
| `text-gradient-blue` | Texto gradient color-blue → accent |
| `hero-glow` | Radial gradient elíptico de primary com 12% opacidade |
| `section-glow` | Radial gradient central de primary com 4% opacidade |
| `mask-fade-b` | Mask que faz fade-to-transparent na parte inferior |
| `glow-primary` | `box-shadow: 0 0 15px -5px primary/20%` |
| `glow-primary-sm` | `box-shadow: 0 0 8px -2px primary/15%` |
| `glow-recording` | `box-shadow: 0 0 20px -5px red/25%` (botão gravando) |
| `bg-dot-grid` | Dots brancos 3% opacidade, grid 24px |
| `noise-overlay` | Textura ruído SVG via ::before, opacidade 1.2% |
| `input-glass` | Input com bg `--bg-input-glass`, border, focus ring |
| `border-gradient` | Borda gradiente animada via ::before + mask |
| `animate-pulse-brand` | Pulsação com box-shadow da cor primary |

### 1.5 Animações

| Keyframe | Descrição |
|----------|-----------|
| `fade-up` | opacity 0→1, translateY 20px→0, 0.6s cubic-bezier |
| `fade-in` | opacity 0→1, translateY 8px→0, 0.4s |
| `slide-in` | opacity 0→1, translateY 8px→0, 0.4s ease-out |
| `slide-up` | opacity 0→1, translateY 20px→0, 0.2s |
| `wave` | scaleY 0.4→1.6 (waveform do recorder) |
| `float` | translateY 0→-4px→0, 3s infinite |
| `pulse-brand` | box-shadow pulse do primary, 2s infinite |
| `shimmer` | background-position -200%→200% |
| `spin-slow` | rotate 0→360deg |
| `pulse-ring` | scale 0.95→1.05, opacity 0.5→0.8 |

### 1.6 ScrollReveal (landing page)
```tsx
// Componente wrapper com framer-motion
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
/>
```

---

## 2. Regras de Composição (OBRIGATÓRIAS)

### Nunca fazer:
- ❌ Usar cores hardcoded (`text-white`, `bg-black`, `bg-gray-900`)
- ❌ Usar `text-green-500`, `bg-blue-600` etc.
- ❌ Criar novos tokens sem adicionar ao index.css E tailwind.config.ts

### Sempre fazer:
- ✅ Usar tokens semânticos: `bg-card`, `text-foreground`, `border-border`, `text-muted-foreground`
- ✅ Botões primários: `gradient-brand text-primary-foreground rounded-lg text-[13px] font-semibold`
- ✅ Cards: `rounded-lg bg-card border border-border`
- ✅ Labels de seção: `text-[11px] text-muted-foreground font-semibold uppercase tracking-wider`
- ✅ Inputs: `bg-secondary/30 border border-border rounded-lg text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/40`
- ✅ Glass surfaces (landing only): usar classe `surface-glass`
- ✅ Ícones: Lucide React, 14-15px no app, 18px em headers de modal

### Padrão de padding/espaçamento no app:
- Main content: `px-4 sm:px-6 lg:px-10 py-5 lg:py-6 max-w-3xl mx-auto`
- Cards internos: `p-3` ou `p-4`
- Gaps entre elementos: `space-y-1.5` a `space-y-5`
- Border radius: `rounded-lg` (padrão), `rounded-xl` (buttons/modals maiores), `rounded-2xl` (modals fullscreen)

---

## 3. Telas — Especificação Detalhada

---

### 3.1 Landing Page (`/`)

**Rota**: `/` — Arquivo: `src/pages/Index.tsx`

**Sequência de seções** (ordem exata):
1. Navbar
2. Hero
3. HowItWorks
4. Features
5. Pricing
6. Security
7. FAQ
8. CTA
9. Footer

A landing page **sempre usa o tema Midnight** independente da preferência do usuário.

---

#### 3.1.1 Navbar (`src/components/landing/Navbar.tsx`)
- **Posição**: `fixed top-0 w-full z-50`
- **Background**: `bg-background/80 backdrop-blur-md border-b border-border/50`
- **Altura**: h auto, py-3
- **Logo**: Ícone SVG de microfone (rect + path + lines) dentro de `w-7 h-7 rounded-lg gradient-cyan` + texto "LaudoVoz" em `font-display font-bold text-[17px]`
- **Links** (desktop): "Como funciona", "Recursos", "Preços", "Segurança", "FAQ" — `text-[13px] text-muted-foreground hover:text-foreground`
- **CTA button**: "Começar grátis" — `gradient-cyan text-primary-foreground px-4 py-2 rounded-lg text-[13px] font-semibold glow-primary-sm`
- **Mobile**: Menu hamburger (`Menu`/`X` icon) com sheet overlay, links empilhados + CTA

---

#### 3.1.2 Hero (`src/components/landing/Hero.tsx`)
- **Container**: `relative min-h-screen flex items-center justify-center overflow-hidden`
- **Background layers**:
  - `bg-dot-grid` (dots sutis)
  - `hero-glow` (radial gradient azul no topo)
  - `noise-overlay` (textura ruído)
- **Badge** (topo): `surface-glass rounded-full px-4 py-1.5` com ícone `Sparkles` + texto "Inteligência Artificial para Radiologia"
- **Título**: `text-hero font-display` com `text-gradient` (branco→cinza) — texto: "Laudos médicos em segundos, não minutos"
- **Subtítulo**: `text-lg text-muted-foreground max-w-2xl` — "Dite ou grave a descrição do exame..."
- **CTAs**: 2 botões lado a lado:
  - "Começar gratuitamente" → `gradient-cyan glow-primary text-primary-foreground px-7 py-3.5 rounded-xl text-[15px] font-bold`
  - "Como funciona" → `surface-glass hover:surface-glass-strong text-foreground px-7 py-3.5 rounded-xl text-[15px] font-semibold`
- **Stats**: 3 métricas em linha: "10.000+ Laudos", "500+ Médicos", "99.5% Precisão" — `text-2xl font-bold text-foreground` + `text-xs text-muted-foreground`
- **Demo interativa** (`HeroDemo`): Card `surface-card rounded-2xl border-gradient` com 4 fases:
  1. **idle**: Botão mic grande + "Toque para iniciar"
  2. **recording**: Botão vermelho pulsante + waveform animada (6 barras com `animation: wave`) + timer
  3. **processing**: Spinner `Loader2 animate-spin` + "Gerando laudo..."
  4. **result**: Texto do laudo aparecendo com typewriter effect + botões "Copiar" e "Novo laudo"

---

#### 3.1.3 Como Funciona (`src/components/landing/HowItWorks.tsx`)
- **Heading**: `text-section font-display` com `text-gradient-blue`
- **Layout**: 3 cards em grid `md:grid-cols-3 gap-6`
- Cada card: `surface-card-hover rounded-2xl p-8` com:
  - Número circular: `w-10 h-10 rounded-xl gradient-cyan text-primary-foreground font-bold text-lg`
  - Ícone: `w-12 h-12 rounded-2xl bg-primary/10` com ícone Lucide `text-primary`
  - Título: `text-lg font-semibold text-foreground`
  - Descrição: `text-sm text-muted-foreground leading-relaxed`
- Steps: "1. Grave ou dite", "2. IA processa", "3. Laudo pronto"
- **ScrollReveal** com delay incremental (0, 0.1, 0.2)

---

#### 3.1.4 Recursos (`src/components/landing/Features.tsx`)
- **Layout**: `grid md:grid-cols-2 lg:grid-cols-3 gap-5`
- **6 feature cards**, cada um: `surface-card-hover rounded-2xl p-7 group`
  - Ícone container: `w-11 h-11 rounded-xl bg-primary/10 group-hover:bg-primary/15`
  - Ícone: Lucide, `text-primary`, tamanho 22px
  - Título: `text-base font-semibold text-foreground`
  - Descrição: `text-sm text-muted-foreground`
- Features listadas:
  1. `Mic` — "Ditado por Voz" / "Grave ou dite..."
  2. `Brain` — "IA Avançada" / "Processamento inteligente..."
  3. `FileText` — "Laudos Estruturados" / "Formatação automática..."
  4. `Clock` — "Histórico Completo" / "Acesse todos..."
  5. `LayoutTemplate` — "Máscaras Editáveis" / "Crie e personalize..."
  6. `Shield` — "Segurança Total" / "Dados criptografados..."

---

#### 3.1.5 Preços (`src/components/landing/Pricing.tsx`)
- **Toggle**: Mensal/Anual com `bg-secondary rounded-full` e pill slider animado
- **3 planos** em grid `lg:grid-cols-3 gap-6`:

| | Basic | Pro (destaque) | Max |
|---|---|---|---|
| Preço mensal | R$ 70 | R$ 120 | R$ 200 |
| Preço anual | R$ 56/mês | R$ 96/mês | R$ 160/mês |
| Laudos | 50/mês | 200/mês | Ilimitados |
| Card style | `surface-card-hover` | `border-gradient relative` + badge "Popular" | `surface-card-hover` |
| CTA | `surface-glass` button | `gradient-cyan glow-primary` button | `surface-glass` button |

- Features com checkmarks (`Check` icon verde) em lista
- Card Pro tem `scale-105` e é visualmente maior
- Badge "Popular": `absolute -top-4 gradient-cyan text-primary-foreground px-4 py-1 rounded-full text-xs font-bold`

---

#### 3.1.6 Segurança (`src/components/landing/Security.tsx`)
- **4 cards** em grid `sm:grid-cols-2 gap-5`
- Cada card: `surface-card-hover rounded-2xl p-7`
- Ícones: `Shield`, `Lock`, `Server`, `Eye` — dentro de container `w-11 h-11 rounded-xl bg-primary/10`
- Temas: Criptografia, LGPD, Servidores BR, Privacidade

---

#### 3.1.7 FAQ (`src/components/landing/FAQ.tsx`)
- **Acordeão customizado** (não usa shadcn Accordion)
- Cada item: `surface-card rounded-2xl` com `border border-border`
- Header: botão com pergunta + `ChevronRight` que **rotaciona 90°** ao expandir
- Body: texto `text-sm text-muted-foreground leading-relaxed` com `animate-slide-up`
- 6 perguntas sobre: como funciona, exames suportados, plano gratuito, segurança, edição de laudos, cancelamento

---

#### 3.1.8 CTA (`src/components/landing/CTA.tsx`)
- Card: `surface-glass rounded-3xl border-gradient p-12 text-center`
- Ícone: `Mic` dentro de `w-14 h-14 rounded-2xl gradient-cyan animate-float`
- Título: `text-section font-display text-gradient`
- 2 botões: "Criar conta gratuita" (gradient-cyan) + "Fale conosco" (surface-glass)

---

#### 3.1.9 Footer (`src/components/landing/Footer.tsx`)
- Background: `bg-card/50 border-t border-border`
- **4 colunas** (desktop): Logo+descrição | Produto (links) | Empresa (links) | Legal (links)
- Cada coluna heading: `text-xs font-semibold text-foreground uppercase tracking-wider`
- Links: `text-sm text-muted-foreground hover:text-foreground`
- Bottom bar: Copyright + "Feito com ❤️ no Brasil"

---

### 3.2 Login (`/login`)

**Arquivo**: `src/pages/Login.tsx`

- **Layout**: Split-screen com `lg:grid-cols-2`
- **Lado esquerdo** (45%, hidden on mobile):
  - Background: `gradient-cyan` com overlay de `noise-overlay`
  - Logo + título "LaudoVoz" com subtítulo
  - **3 stats animadas** com `AnimatedNumber` (componente interno que anima de 0 ao valor):
    - "10.000+" laudos, "500+" médicos, "99.5%" precisão
  - Cada stat: `bg-white/10 backdrop-blur rounded-2xl p-5`
- **Lado direito** (formulário):
  - Card centralizado `max-w-sm`
  - Toggle "Entrar" / "Criar conta" — tabs em `bg-secondary rounded-xl p-1`
  - **Google button**: `w-full py-3 rounded-xl border border-border bg-secondary/30 flex items-center justify-center gap-3` com SVG do Google
  - **Divider**: linha com "ou" no meio
  - **Form**: campos Email + Senha (+ Nome no modo cadastro)
    - Inputs: `bg-secondary/30 border border-border rounded-xl text-[13px]`
  - **Submit**: `w-full py-3 rounded-xl gradient-cyan text-primary-foreground font-bold glow-primary`
  - Link "Esqueceu a senha?" em `text-primary text-xs`

---

### 3.3 2FA (`/2fa`)

**Arquivo**: `src/pages/TwoFactor.tsx`

- **Layout**: Centralizado na tela, `min-h-screen flex items-center justify-center`
- **Background**: `hero-glow` sutil
- **Card**: `surface-card rounded-2xl p-8 max-w-sm border-gradient`
- Logo mic SVG + `Shield` icon
- Título: "Verificação em duas etapas"
- **6 inputs OTP**: grid `grid-cols-6 gap-2`, cada input:
  - `w-full aspect-square rounded-xl bg-secondary/30 border border-border text-center text-xl font-bold`
  - Focus: `ring-2 ring-primary/40 border-primary/40`
- Botão "Verificar": `gradient-cyan text-primary-foreground w-full py-3 rounded-xl font-bold glow-primary`
- Link "Usar outro método" + "Voltar ao login"

---

### 3.4 App Dashboard (`/app`)

**Arquivo**: `src/pages/AppDashboard.tsx`

**Layout geral**: `flex min-h-screen bg-background`
- Sidebar (desktop, 220px fixo à esquerda)
- Conteúdo principal (flex-1)

**Estado**: Tab ativa controlada por `useState<Tab>` onde `Tab = "dashboard" | "laudos" | "historico" | "mascaras" | "config"`

---

#### 3.4.1 Sidebar (`src/components/app/Sidebar.tsx`)
- **Desktop only**: `hidden lg:flex`, `w-[220px] h-screen sticky top-0`
- **Background**: `bg-sidebar border-r border-border`

**Estrutura vertical**:
1. **Logo bar** (h-[52px]): Ícone mic SVG em `w-6 h-6 rounded-md bg-primary` + "LaudoVoz" text
2. **Search**: `bg-secondary/50 border border-border rounded-lg text-[12px]` com ícone Search + `⌘K` kbd
3. **Nav**: Label "Menu" (`text-[10px] uppercase tracking-[0.1em]`) + 5 itens:
   - Laudos (`FileText`), Histórico (`Clock`), Máscaras (`LayoutTemplate`), Dashboard (`BarChart3`), Configurações (`Settings`)
   - Item ativo: `bg-secondary text-foreground` com ícone `text-primary`
   - Item inativo: `text-muted-foreground hover:text-foreground hover:bg-secondary/50`
   - Laudos tem badge de contagem: `bg-secondary text-[10px] font-semibold rounded px-1.5 py-0.5`
4. **User footer**: Avatar circular `w-6 h-6 rounded-full bg-primary/15` com iniciais + nome + email + `LogOut` icon on hover

---

#### 3.4.2 Mobile Header (`src/components/app/MobileHeader.tsx`)
- **Top bar**: `lg:hidden sticky top-0 z-40 h-11 bg-background border-b border-border`
  - Logo mic SVG menor (w-5 h-5) + "LaudoVoz"
- **Bottom tab bar**: `lg:hidden fixed bottom-0 z-40 h-14 bg-background border-t border-border`
  - 5 ícones com labels `text-[10px]`
  - Ativo: `text-primary`, Inativo: `text-muted-foreground`

---

#### 3.4.3 Desktop Breadcrumb
- `hidden lg:flex h-[52px] px-6 border-b border-border`
- Formato: "LaudoVoz / **[Página Ativa]**"
- `text-[12px] text-muted-foreground`, página ativa em `text-foreground font-medium`

---

#### 3.4.4 Aba Laudos (padrão)

**Componentes em sequência**:

##### PlanBar (`src/components/app/PlanBar.tsx`)
- Barra horizontal: `bg-card border border-border rounded-lg p-3`
- Layout flex: Label "Plano Free" + barra de progresso (`h-1.5 rounded-full bg-secondary` com fill `gradient-cyan`) + "7/15 laudos" + botão "Assinar Pro" (`gradient-brand text-primary-foreground text-[11px] rounded-md px-3 py-1`)

##### ExamTabs (`src/components/app/ExamTabs.tsx`)
- **Grid**: `grid grid-cols-2 sm:grid-cols-4 gap-1.5`
- **8 tipos de exame**: USG Abdome, Tireoide, USG Mama, Próstata, Obstétrica, Pélvica, Partes Moles, Doppler
- Cada botão: `px-3 py-2.5 rounded-lg text-[12px] font-medium border`
  - Selecionado: `bg-primary/10 border-primary/30 text-foreground`
  - Normal: `bg-secondary/30 text-muted-foreground border-border/50 hover:bg-secondary/50 hover:text-foreground`

##### Recorder (`src/components/app/Recorder.tsx`)
- **Toggle voz/texto**: 2 botões em `bg-secondary rounded-xl p-1` — `Mic`/"Voz" e `Type`/"Texto"

**Modo Voz (padrão)**:
- **Estado idle**: Botão mic central `w-16 h-16 rounded-2xl gradient-cyan glow-primary animate-pulse-brand` + texto "Toque para gravar"
- **Estado gravando**: Botão vermelho `bg-destructive glow-recording` + waveform (8 barras com `animation: wave` staggered) + timer MM:SS
- **Estado pausado**: Waveform para, botão "Retomar"
- **Controles gravação**: 3 botões — Descartar (`Trash2`, destructive), Pausar/Retomar (`Pause`/`Play`), Enviar (`Send`, gradient-cyan)

**Pós-gravação**:
- Textarea com transcrição: `bg-secondary/30 border border-border rounded-xl text-[13px]`
- Botão "Gerar Laudo": `w-full py-3.5 rounded-xl gradient-brand text-primary-foreground font-bold glow-primary text-sm`
- Se vazio, botão desabilitado com `opacity-50`

**Modo Texto**:
- Textarea direto sem gravação
- Mesmo botão "Gerar Laudo"

##### ReportView (`src/components/app/ReportView.tsx`)
- **Campo paciente**: Input com label + `User` icon
- **Card do laudo**: `bg-card border border-border rounded-xl`
  - **Seções editáveis** (Fígado, Vesícula, etc.): Cada uma com heading `text-[11px] uppercase text-primary font-bold` + texto `text-[13px] text-foreground`
  - **Hover**: Mostra botão `Pen` para editar inline
  - **Edição**: Textarea substitui o texto, com botões Salvar/Cancelar
- **Impressão**: Seção "IMPRESSÃO" destacada com `bg-primary/5 border-l-2 border-primary`
- **Ações**: Grid de 4 botões — `Save` Salvar, `Copy` Copiar, `FileDown` PDF, `Printer` Imprimir
  - Estilo: `surface-glass rounded-xl py-2.5 text-xs font-medium`
- **Correção por voz**: Botão `Mic` para ditar correções
- **Rating**: 5 estrelas (`Star` icons) + textarea de feedback opcional
- **Botão "Novo Laudo"**: `w-full py-3 rounded-xl border border-border text-muted-foreground font-medium`

---

#### 3.4.5 Aba Dashboard (`src/components/app/DashboardView.tsx`)
- **Seletor de período**: 3 botões (7d/30d/3m) em `bg-secondary rounded-lg p-0.5`
- **4 KPI cards**: Grid `grid-cols-2 lg:grid-cols-4 gap-3`
  - Cada card: `bg-card border border-border rounded-lg p-3`
  - Valor: `text-xl font-bold text-foreground`
  - Label: `text-[11px] text-muted-foreground`
  - Trend badge: `text-[10px] font-semibold` verde/vermelho com seta
- **GoalRing**: SVG circular (meta mensal) com `stroke-dasharray` animado
- **Heatmap**: Grid 7×24 de quadrados coloridos (horários de pico)
- **Bar chart**: Barras horizontais com `gradient-cyan`
- **Comparativo**: Cards side-by-side "Este período" vs "Anterior"
- **Distribuição por tipo**: Lista com porcentagem + mini barra

---

#### 3.4.6 Aba Histórico (`src/components/app/HistoryPage.tsx`)
- **Header**: Título + campo de busca com `Search` icon
- **Filtros**: Botões de tipo de exame (mesmo estilo do ExamTabs)
- **Lista de cards**: Cada laudo salvo:
  - `bg-card border border-border rounded-lg p-3`
  - Header: nome exame + paciente + data
  - Preview: texto truncado `max-h-24 overflow-hidden`
  - Actions: `Copy` + `Trash2`
- **Empty state**: Ícone `ClipboardList` + "Nenhum laudo salvo ainda"

---

#### 3.4.7 Aba Máscaras (`src/components/app/MaskEditorPage.tsx` → `MaskEditor.tsx`)
- **Fullscreen modal**: `fixed inset-0 z-50 bg-background/90 backdrop-blur-sm`
- **Card principal**: `bg-card rounded-2xl w-[96vw] h-[92vh] border border-border shadow-2xl`

**Estrutura**:
1. **Header**: Ícone `FileText` + "Editor de Máscaras" + botão fechar `X`
2. **Sync tip**: Banner dismissível com ícone `Smartphone`
3. **Exam tabs**: Botões scrolláveis horizontalmente + "Novo" com `Plus` e border dashed
   - Ativo: `bg-primary/10 border-primary/30`
4. **Mobile tabs**: "Normal" / "Achados" (visível apenas em mobile)
5. **2 colunas** (desktop side-by-side, mobile com tabs):
   - **Normal** (esquerda): Lista de seções expansíveis
     - Cada seção: `surface-glass rounded-xl border` com `ChevronRight`/`ChevronDown`
     - Expandida: `surface-glass-strong border-primary/20` com inputs Nome + Texto + botões Cancelar/Salvar
     - "Nova Seção" com `Plus` icon + border dashed
   - **Achados** (direita): Mesmo layout mas para findings patológicos
     - Cada achado tem sublabel com a seção alvo (ex: "Fígado")
     - "Novo Achado" com border dashed
6. **Footer fixo**: Botões "Foto" (Camera), "Sync" (RefreshCw), "Salvar" (Save gradient-brand)

**Import por foto** (overlay):
- Upload de imagens (até 10) com preview grid
- Botão "Criar Máscara" que mostra loading state com `Loader2 animate-spin`

---

#### 3.4.8 Aba Configurações (`src/components/app/SettingsPage.tsx` → `SettingsModal.tsx`)

**Campos em sequência vertical** (dentro de card `bg-card border border-border rounded-xl p-3 sm:p-4`):

1. **Header**: "CONFIGURAÇÕES" label + botões "Sair" (LogOut, destructive) + fechar (X)
2. **Email logado**: `text-[11px] text-muted-foreground`
3. **PlanBar**: Mesmo componente de uso de laudos
4. **Nome do médico**: Input padrão
5. **CRM**: Input padrão
6. **Assinatura digital**: Botão upload ou preview da imagem + botão remover
7. **2FA**: Card `bg-accent/[0.04] border border-accent/15 rounded-lg p-3`
   - 3 estados: desativado (botão "Ativar 2FA"), enrolling (QR code + input 6 dígitos), ativado (badge verde + "Desativar")
8. **Som**: Toggle button com ícone `Volume2`/`VolumeX` + badge On/Off
9. **Tema**: Grid 3 colunas — Midnight (`Moon`), Ocean (`Waves`), Claro (`Sun`)
   - Selecionado: `bg-primary/10 border-primary/30`
10. **Salvar**: `gradient-brand text-primary-foreground w-full py-2.5 rounded-xl font-semibold`
11. **Excluir conta**: Link vermelho que expande para campo de confirmação "EXCLUIR MINHA CONTA"

---

## 4. Modais Auxiliares

### FeedbackModal (`src/components/app/FeedbackModal.tsx`)
- Overlay: `bg-background/80 backdrop-blur-sm`
- Card: `bg-card border border-border rounded-xl max-w-md p-5`
- **Tipo**: Grid 4 colunas — 🐛 Bug, 💡 Ideia, 👆 Usabilidade, 💬 Geral
  - Selecionado: `gradient-cyan text-primary-foreground`
- **Campos**: Título (input) + Descrição (textarea com counter /2000)
- **Submit**: `gradient-brand text-primary-foreground w-full py-3 rounded-xl`

### HistoryModal (`src/components/app/HistoryModal.tsx`)
- Similar ao HistoryPage mas em modal
- Header com botão "Limpar tudo" (destructive)
- Cards de laudos com Copiar + Deletar

---

## 5. Estrutura de Rotas

```tsx
<Routes>
  <Route path="/" element={<Index />} />        // Landing page
  <Route path="/login" element={<Login />} />    // Login/Cadastro
  <Route path="/2fa" element={<TwoFactor />} />  // Verificação 2FA
  <Route path="/app" element={<AppDashboard />} /> // App principal
  <Route path="*" element={<NotFound />} />      // 404
</Routes>
```

---

## 6. Dependências Principais

- React 18 + Vite + TypeScript
- Tailwind CSS + tailwindcss-animate
- shadcn/ui (componentes base customizados)
- framer-motion (ScrollReveal na landing)
- Lucide React (todos os ícones)
- @tanstack/react-query
- react-router-dom
- sonner (toasts)

---

## 7. Temas — Como Funciona

```tsx
// src/hooks/use-theme.tsx
// 3 temas: "dark" (padrão), "ocean", "light"
// Salvo em localStorage("laudovoz-theme")
// Aplicado via data-theme attribute no <html>
// Landing page ignora — sempre Midnight
```

O seletor de tema fica em Configurações (aba "config" do dashboard).

---

## 8. Print Styles

Ao imprimir (botão Imprimir no ReportView):
- Esconde sidebar, nav, header, elementos fixed
- Backgrounds viram branco
- Textos viram preto
- Bordas viram `#ddd`
- Remove box-shadows
