

# Criar documento DESIGN_SPEC.md completo para Claude Code

## Objetivo
Gerar um arquivo `DESIGN_SPEC.md` no projeto contendo a especificacao visual e funcional completa de todas as telas e componentes do LaudoVoz, para que o Claude Code (ou qualquer outra IA) consiga replicar o design 1:1 sem reinterpretar.

## O que sera documentado

### 1. Sistema de Design (Tokens)
- 3 temas completos: Dark (Midnight), Ocean, Light -- com todas as CSS variables
- Tipografia: Inter (body) + Manrope (display), tamanhos hero/section
- Utility classes customizadas: `surface-glass`, `surface-card`, `gradient-cyan`, `gradient-brand`, `text-gradient-blue`, `mask-fade-b`, `glow-primary`
- Espacamentos e border-radius padroes
- Animacoes: fade-up, fade-in, slide-in, wave, float, pulse-brand

### 2. Landing Page (/)
Sequencia exata de secoes:
- **Navbar**: fixa, blur, logo SVG mic + links anchor + botao gradient-cyan
- **Hero**: grid background sutil, glow radial, titulo `text-hero` com gradient, demo interativa (HeroDemo com 4 fases: idle/recording/processing/result)
- **HowItWorks**: 3 cards com numeros circulares, ScrollReveal
- **Features**: grid 3 colunas, 6 cards com icones Lucide
- **Pricing**: 3 planos (Basic R$70, Pro R$120, Max R$200), toggle mensal/anual, card Pro destacado com borda gradient
- **Security**: 4 cards centralizados
- **FAQ**: acordeao customizado com ChevronRight rotacionando
- **CTA**: card surface-glass com 2 botoes
- **Footer**: 4 colunas (brand + 3 grupos de links)

### 3. Login (/login)
- Split-screen: lado esquerdo 45% com stats animados (AnimatedNumber), lado direito formulario
- Google OAuth button + divider "ou" + form email/senha
- Toggle login/cadastro inline

### 4. 2FA (/2fa)
- Centralizado, card surface-card, 6 inputs OTP numericos
- Logo + icone Shield

### 5. App Dashboard (/app)
- **Sidebar** desktop: 220px fixa, logo, busca com ⌘K, nav com 5 itens, usuario no footer
- **MobileHeader**: top bar + bottom tab bar fixo
- **Breadcrumbs** desktop: LaudoVoz / [pagina ativa]

#### Aba Laudos (tela principal)
- PlanBar: barra de progresso + botao "Assinar Pro"
- ExamTabs: grid 4 colunas de botoes texto (8 tipos de exame)
- Recorder: toggle voz/texto, botao mic 64px, timer, waveform animada, controles (Descartar/Pausar/Enviar), textarea transcricao, botao "Gerar Laudo"
- ReportView: campo paciente, card com secoes editaveis (hover para editar), impressao com destaque, acoes (Salvar/Copiar/PDF/Imprimir), correcao por voz, rating panel

#### Aba Dashboard
- Seletor periodo (7d/30d/3m), 4 metricas KPI, GoalRing SVG, heatmap horarios de pico, bar chart, comparativo periodo, distribuicao por tipo

#### Aba Historico
- Busca + filtros por tipo de exame, cards com copiar/deletar, empty state

#### Aba Mascaras
- Editor de templates: tabs de exame com favoritos, 2 colunas (Normal + Achados), secoes expansiveis, import por foto/camera

#### Aba Configuracoes
- Dados do medico, upload assinatura, 2FA toggle, som on/off, seletor 3 temas, feedback form, logout, excluir conta

### 3. Regras de composicao
- Nunca usar cores hardcoded -- sempre tokens CSS (`bg-card`, `text-foreground`, `border-border`)
- Cards: `rounded-lg bg-card border border-border p-3`
- Labels: `text-[11px] text-muted-foreground font-medium uppercase tracking-wider`
- Inputs: `bg-secondary/30 border border-border rounded-lg text-[13px]`
- Botao primario: `bg-primary text-primary-foreground rounded-lg text-[13px] font-semibold`
- Glass surfaces na landing: `surface-glass` (background semi-transparente + border sutil)
- Todos os icones sao Lucide React, tamanho padrao 14-15px no app

## Implementacao
Criar um unico arquivo `DESIGN_SPEC.md` na raiz do projeto com toda essa informacao estruturada, incluindo trechos de codigo CSS/TSX como referencia.

