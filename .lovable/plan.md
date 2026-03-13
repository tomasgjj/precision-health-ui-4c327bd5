

## Repaginar MaskEditor — Estilo Premium Mobile-First

O MaskEditor atual tem uma aparência genérica com muitos botões coloridos no header que não combinam com o restante do app (Settings, Recorder, ReportView). Vou alinhar com a estética do design system: glassmorphism sutil, hierarquia clara, e foco em usabilidade mobile.

### Mudanças Principais

**1. Header simplificado**
- Remover os 4 botões coloridos (Foto/Sync/Salvar/Fechar) do header principal
- Header limpo com título + botão fechar (X) alinhado à direita, igual ao SettingsModal
- Ações (Foto, Sync, Salvar) movidas para um footer sticky ou inline no body

**2. Sync tip refinado**
- Transformar em um banner mais discreto com `surface-glass` e borda sutil, sem cor forte de fundo

**3. Exam tabs**
- Manter pills horizontais mas com estilo `surface-glass` para o ativo, sem `gradient-cyan` pesado — usar borda `primary` e `bg-primary/10` para o selecionado (consistente com ExamTabs do dashboard)

**4. Mobile tabs (Normal/Achados)**
- Manter o mesmo padrão de underline tab mas com proporções mais refinadas

**5. Section cards**
- Cards com `surface-glass` em vez de `bg-secondary/50`
- Hover mais sutil, ícone de lixeira com opacidade 0 → aparece no hover/touch
- Formulário expandido com inputs `input-glass` consistentes com o resto do app

**6. Botões de ação no footer (mobile)**
- Footer fixo com os 3 botões principais (Foto, Sync, Salvar) em estilo consistente com o ReportView
- Salvar como botão primário (`gradient-brand`), Foto e Sync como botões secundários com borda

**7. MaskImport**
- Remover emoji do título (📷), usar ícone `Camera` do Lucide
- Cards de upload mais refinados com ícones Lucide em vez de emojis

### Arquivos Modificados
- `src/components/app/MaskEditor.tsx` — reestruturação completa do layout e estilos

