import type { TranslationKeys } from "./en";

export const ptBR: Record<TranslationKeys, string> = {
  "nav.about": "Sobre",
  "nav.projects": "Projetos",
  "nav.contact": "Contato",
  "nav.blog": "Blog",
  "nav.links": "Links",
  "nav.resume": "Currículo",
  "nav.resumeUrl": "/api/resume/pt",
  "nav.menu": "Abrir menu",
  "theme.toggle": "Alternar entre tema claro e escuro",
  "language.change": "Mudar idioma",
  "language.en": "Inglês",
  "language.pt-BR": "Português",

  "intro.role": "Engenheiro de Software",
  "intro.location": "Salvador, Brasil",
  "intro.description":
    "Desenvolvo apps web e mobile com React, Next.js e React Native. Também escrevo software para o desktop Linux: extensões do GNOME, apps GTK e ferramentas de linha de comando.",
  "intro.downloadCv": "Baixar currículo",
  "intro.getInTouch": "Fale comigo",

  "projects.title": "Projetos",
  "projects.subtitle":
    "Apps web, extensões de navegador e ferramentas para o desktop Linux. Selecione um projeto para abrir a prévia e os detalhes.",
  "projects.featured": "Destaques",
  "projects.other": "Mais projetos",

  "filter.platform": "Filtrar por plataforma",
  "filter.all": "Todos",
  "platform.web": "Web",
  "platform.mobile": "Mobile",
  "platform.extension": "Extensões de navegador",
  "platform.gnome": "GNOME / Linux",
  "platform.cli": "Linha de comando",
  "filter.tech": "Tecnologia",
  "filter.anyTech": "Qualquer tecnologia",
  "filter.count": "Mostrando {shown} de {total} projetos",
  "filter.countAll": "{total} projetos",
  "filter.empty": "Nenhum projeto corresponde a esses filtros.",
  "filter.clear": "Limpar filtros",

  "project.open": "Ver detalhes de {name}",
  "project.source": "GitHub",
  "project.store": "Página na loja",
  "project.demo": "Ver online",
  "project.published": "Publicado em {host}",
  "project.online": "No ar",
  "project.noPreview": "Sem prévia disponível",
  "project.prev": "Projeto anterior",
  "project.next": "Próximo projeto",
  "project.close": "Fechar",
  "project.dragHint": "Arraste para mover",
  "project.builtWith": "Feito com",
  "project.sourcePrivate": "Código não público",
  "project.position": "{index} de {total}",

  "projects.flexa.title": "Flexa",
  "projects.flexa.description":
    "Um app para GNOME que converte temas de cursor do Windows para o formato do Linux. Escrito em Python com GTK4 e LibAdwaita. O GitHub Actions gera os pacotes Flatpak e RPM.",

  "projects.quickLofi.title": "Quick Lofi",
  "projects.quickLofi.description":
    "Uma extensão do GNOME Shell que toca rádio lo-fi pela barra superior com um clique. Já passou de 10.000 downloads no site oficial de extensões do GNOME.",

  "projects.blog.title": "Blog",
  "projects.blog.description":
    "Meu blog bilíngue, em inglês e português, feito com Astro, Tailwind CSS e MDX. É todo estático, com um feed RSS por idioma, busca por texto ou #tag e uma checagem de traduções que roda no CI antes de cada build.",

  "projects.pixDonation.title": "Sistema de Doações via PIX",
  "projects.pixDonation.description":
    "Uma página que gera QR Codes PIX para doações, com seleção de estado e cidade e valor livre. O gerador de BR Code foi escrito em JavaScript puro.",

  "projects.scrolled.title": "Scrolled",
  "projects.scrolled.description":
    "Uma extensão para Firefox que adiciona um pequeno indicador de rolagem, para você ver quanto da página já leu. Ajuda em artigos longos e documentação.",

  "projects.feedPet.title": "Feed Pet",
  "projects.feedPet.description":
    "Um app em Next.js e shadcn/ui para registrar quando cada pet comeu, para ninguém em casa alimentar duas vezes ou esquecer.",

  "projects.cssCursorGallery.title": "Galeria de Cursores CSS",
  "projects.cssCursorGallery.description":
    "Uma galeria interativa com todos os cursores do CSS. Dá para buscar um cursor e copiar o valor com um clique. Feita com HTML, CSS moderno (:is(), light-dark(), nesting, backdrop-filter) e JavaScript puro.",

  "projects.urlShort.title": "URL Short",
  "projects.urlShort.description": "Um encurtador de links: cole um link longo e receba um curto.",

  "projects.snapTheWeb.title": "Snap The Web",
  "projects.snapTheWeb.description":
    "Um app web que tira um print de qualquer site a partir da URL, com algumas opções para ajustar a captura.",

  "projects.getCat.title": "Get Cat",
  "projects.getCat.description":
    "Um app pequeno que mostra uma foto aleatória de gato e uma curiosidade.",

  "projects.nautilusCopy.title": "Nautilus Copy File Contents",
  "projects.nautilusCopy.description":
    "Uma extensão do Nautilus que copia o conteúdo de um arquivo de texto com um clique.",

  "projects.decomp.title": "decomp",
  "projects.decomp.description": "Uma ferramenta de linha de comando para descompactar arquivos.",

  "projects.harbor.title": "Harbor",
  "projects.harbor.description":
    "Um daemon em Rust que organiza arquivos. Ele observa pastas e move arquivos por extensão, tipo MIME, tamanho ou data. Espera os downloads terminarem, resolve conflitos de nome e movimentações entre discos, e recarrega a configuração sem reiniciar. Usa threads nativas em vez de um runtime assíncrono.",

  "projects.redditAutoTheme.title": "Reddit Auto Theme",
  "projects.redditAutoTheme.description":
    "Uma extensão para Firefox que troca o Reddit entre claro e escuro conforme o tema do sistema.",

  "about.title": "Sobre",
  "about.paragraph1":
    "Sou engenheiro de software em Salvador. A maior parte do meu trabalho é web e mobile, com React, Next.js e React Native. Também gosto de descer na stack, então escrevo extensões do GNOME e apps GTK em Python e JavaScript, e um pouco de Rust.",
  "about.paragraph2":
    "Gosto de software simples de usar e simples de manter. Automatizo o que se repete, de pipelines de CI a empacotamento, e presto atenção em acessibilidade e nos detalhes pequenos de uma interface.",
  "about.stack.title": "Caixa de ferramentas",
  "about.stack.hint": "Arraste o cartão de cima para o lado, ou use o botão, para ver os outros.",
  "about.stack.next": "Próximo cartão",
  "about.stack.position": "Cartão {index} de {total}",
  "skills.languages": "Linguagens",
  "skills.frontend": "Frontend",
  "skills.desktopBackend": "Desktop e Backend",
  "skills.tools": "Ferramentas e fluxo",

  "contact.title": "Fale comigo",
  "contact.subtitle":
    "Escreva sobre uma vaga, um projeto ou qualquer outra coisa. Pode ser por e-mail ou pelo formulário.",
  "contact.email": "E-mail",
  "contact.copy": "Copiar endereço de e-mail",
  "contact.copied": "Endereço de e-mail copiado",
  "contact.form.name": "Nome",
  "contact.form.email": "E-mail",
  "contact.form.message": "Mensagem",
  "contact.form.submit": "Enviar mensagem",
  "contact.form.sending": "Enviando...",
  "contact.form.namePlaceholder": "Seu nome",
  "contact.form.emailPlaceholder": "voce@exemplo.com",
  "contact.form.messagePlaceholder": "Sobre o que você quer conversar?",
  "contact.form.success": "Mensagem enviada. Respondo por e-mail.",
  "contact.form.error": "Sua mensagem não foi enviada. Tente de novo ou me mande um e-mail.",
  "contact.form.error.name": "O nome precisa ter pelo menos 2 caracteres",
  "contact.form.error.email": "Digite um e-mail válido",
  "contact.form.error.message": "A mensagem precisa ter pelo menos 10 caracteres",

  "footer.rights": "Todos os direitos reservados.",
  "footer.resume": "Currículo",
};
