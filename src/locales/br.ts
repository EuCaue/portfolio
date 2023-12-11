export default {
  header: {
    sections: ['Inicio', 'Sobre', 'Projetos', 'Contato'],
    sectionGoto: 'Ir Para {section}',
    titleXButton: 'Fechar Menu Lateral',
    titleMenuButton: 'Abrir Menu Lateral',
    titleGithubButton: 'Ir para meu perfil no Github.',
    titleLinkedinButton: 'Ir para meu perfil no Linkedin.',
    titleToggleTheme: 'Trocar Tema',
    titleToggleLanguage: 'Trocar Idioma'
  },
  intro: {
    introduction: 'Eu Sou um',
    occupation: 'desenvolvedor full stack',
    occupationDescription:
      'com paixão por criar websites e aplicativos envolventes e amigáveis para o usuário.',
    getStartedButton: 'Comece o tour',
    getStartedButtonTitle: 'Ir para Sobre.',
    greeting: 'Olá',
    wordsTypeWriter:
      'Usuário, Mundo, Pessoa, Amigo, A Todos, Estrangeiro, Gente, Visitante'
  },
  about: {
    greeting: 'Olá, meu nome é ',
    introduction: 'Eu sou um ',
    name: 'Cauê Souza',
    occupation: 'Desenvolvedor Full Stack',
    from: 'do',
    country: ['B', 'r', 'a', 's', 'i', 'l'],
    interests:
      '\nEu adoro aprender novas tecnologias e estou sempre em busca de novos desafios e',
    projects: 'projetos de código aberto',
    collaboration:
      'para colaborar, portanto, sinta-se à vontade para entrar em contato comigo.',
    projectsButton: 'meus projetos',
    projectsButtonTitle: 'Ir para Projetos.'
  },
  project: {
    slideButton: {
      left: 'Item anterior do carrossel',
      right: 'Proximo item do carrossel',
      imagePreview: 'Mudar imagem do carrossel'
    },
    ariaLabelDetails: 'Detalhes do projeto: {projectName}',
    githubButton: 'Projeto: {projectName} Repositório no GitHub',
    previewButton: 'Ver projeto: {projectName}',
    techAriaLabel: '{tech} ícone'
  }
} as const;
