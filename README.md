# Tech Conference App

Uma aplicação moderna para gerenciamento e inscrição em conferências de tecnologia, construída com React, TypeScript e Vite.

## 🚀 Funcionalidades

- 📅 Navegue por conferências de tecnologia
- 🔍 Filtre conferências por categoria e termos de busca
- 📝 Processo simplificado de inscrição
- 💫 Animações suaves usando Framer Motion
- 📱 Design responsivo para todos os dispositivos
- 🎨 Interface moderna com Tailwind CSS

## 🛠️ Stack Tecnológica

- **Framework:** React 18 com TypeScript
- **Build Tool:** Vite
- **Estilização:** Tailwind CSS
- **Formulários:** React Hook Form com Yup
- **Testes:** Vitest + React Testing Library
- **Animações:** Framer Motion
- **Qualidade de Código:** ESLint + Prettier

## 🏃‍♂️ Começando

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/amandaisarra/reactjs-mvp-spa.git
cd reactjs-mvp-spa
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run test` - Executa testes
- `npm run lint` - Executa ESLint
- `npm run format` - Formata código com Prettier

## 🇧🇷 Instruções em Português

### Como Executar o Projeto

1. **Pré-requisitos**

   - Node.js versão 16 ou superior instalado
   - npm (gerenciador de pacotes do Node.js)
   - Git instalado

2. **Clone o Repositório**

   ```bash
   git clone https://github.com/amandaisarra/reactjs-mvp-spa.git
   cd reactjs-mvp-spa
   ```

3. **Instale as Dependências**

   ```bash
   npm install
   ```

4. **Execute o Projeto**

   - Para desenvolvimento:
     ```bash
     npm run dev
     ```
   - Para produção:
     ```bash
     npm run build
     npm run preview
     ```

5. **Executar Testes**

   ```bash
   # Executa todos os testes
   npm run test

   # Executa testes com cobertura
   npm run test:coverage
   ```

6. **Comandos Úteis**

   ```bash
   # Verifica qualidade do código
   npm run lint

   # Formata o código
   npm run format

   # Verifica tipos TypeScript
   npm run typecheck
   ```

### Estrutura de Arquivos em Português

```
src/
├── components/          # Componentes reutilizáveis
│   ├── atoms/          # Componentes básicos (botões, inputs)
│   ├── molecules/      # Componentes médios (cards, forms)
│   └── organisms/      # Componentes complexos (header, footer)
├── pages/              # Páginas da aplicação
├── services/           # Serviços e chamadas API
├── types/              # Tipos TypeScript
├── utils/             # Funções utilitárias
└── styles/            # Estilos globais
```

### Fluxo de Desenvolvimento

1. **Criar Nova Feature**

   ```bash
   git checkout -b feat/nome-da-feature
   ```

2. **Corrigir Bug**

   ```bash
   git checkout -b fix/nome-do-fix
   ```

3. **Commit das Alterações**

   ```bash
   git add .
   git commit -m "feat: descrição da feature"
   ```

4. **Push e Pull Request**
   ```bash
   git push origin nome-da-branch
   ```

### Deployment

- O projeto está configurado para deploy automático no Netlify
- Cada PR gera um preview deployment
- Merge na main faz deploy automático em produção

### Contatos e Suporte

- Para reportar bugs, abra uma issue no GitHub
- Para contribuições, faça um fork e envie um PR
- Para dúvidas, entre em contato através das issues

## 🏗️ Otimizações de Build

O projeto inclui várias otimizações de performance:

- Code splitting por rotas
- Otimização de imagens
- Compressão Gzip e Brotli
- CSS code splitting
- Tree shaking
- Vendor chunk splitting
- Lazy loading de componentes

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── atoms/           # Componentes básicos
│   ├── molecules/       # Componentes compostos
│   └── organisms/       # Componentes complexos
├── pages/               # Páginas da aplicação
├── services/            # Lógica de negócio e API
├── types/               # Definições TypeScript
├── utils/              # Funções auxiliares
└── styles/             # Estilos globais
```

## 🎯 Decisões Técnicas

### Design System

- Utilização do Atomic Design para organização dos componentes
- Sistema de cores consistente com variáveis CSS
- Tipografia responsiva com scale definido no Tailwind
- Componentes reutilizáveis e modulares

### Responsividade

- Layout mobile-first
- Breakpoints definidos:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- Menu hamburguer para dispositivos móveis
- Grid responsivo no footer
- Imagens e logos otimizados para cada breakpoint

### Performance

- Lazy loading de imagens
- Code splitting automático por rotas
- Otimização de assets estáticos
- Caching eficiente
- Compressão de assets

### Acessibilidade

- Semântica HTML apropriada
- Labels e ARIA attributes
- Suporte a navegação por teclado
- Contraste adequado de cores
- Textos alternativos para imagens

## 🔄 Ciclo de Desenvolvimento

1. **Planejamento**

   - Definição de features
   - Prototipagem de UI/UX
   - Definição de sprints

2. **Desenvolvimento**

   - Implementação de features
   - Code review
   - Testes unitários e de integração

3. **Qualidade**

   - Testes automatizados
   - Análise de performance
   - Revisão de acessibilidade

4. **Deploy**
   - Build de produção
   - Testes em ambiente de staging
   - Deploy contínuo

## 🎯 Implementações Futuras

1. **Features Planejadas**

   - [ ] Área do usuário com dashboard
   - [ ] Sistema de pagamento integrado
   - [ ] Certificados digitais
   - [ ] Chat ao vivo com suporte
   - [ ] App PWA
   - [ ] Notificações push
   - [ ] Sistema de avaliação de palestras
   - [ ] Integração com calendário

2. **Melhorias Técnicas**

   - [ ] Implementação de testes E2E
   - [ ] Cobertura de testes > 80%
   - [ ] Melhorias de SEO
   - [ ] Otimização de performance
   - [ ] Cache com Service Workers
   - [ ] Internacionalização completa

3. **UX/UI**
   - [ ] Modo escuro
   - [ ] Temas customizáveis
   - [ ] Mais animações e transições
   - [ ] Melhorias de micro-interações

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Convenções de Código

- Commits seguem o padrão Conventional Commits
- Código documentado em português
- Nomes de variáveis e funções em inglês
- Testes para novas funcionalidades
- ESLint e Prettier configurados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.