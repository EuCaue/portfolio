// locales/en.ts
export default {
  header: {
    sections: ['Home', 'About', 'Projects', 'Contact'],
    sectionGoto: 'Go to {section}',
    titleXButton: 'Close Sidebar',
    titleMenuButton: 'Open Sidebar',
    titleGithubButton: 'Go to my Github Profile',
    titleLinkedinButton: 'Go to my Linkedin Profile',
    titleToggleTheme: 'Toggle Theme',
    titleToggleLanguage: 'Toggle Language'
  },
  intro: {
    introduction: 'I am a',
    occupation: 'full stack developer',
    occupationDescription:
      'with a passion for creating engaging and user-friendly websites and applications.',
    getStartedButton: 'Get Started',
    getStartedButtonTitle: 'Go to About.',
    greeting: 'Hello',
    wordsTypeWriter:
      'User, World, Person, Friend, Everyone, Stranger, Folks, Guest'
  },
  about: {
    greeting: 'Hi, my name is ',
    introduction: "I'm a ",
    name: 'Cauê Souza',
    occupation: 'Full Stack Developer',
    from: 'from',
    country: ['B', 'r', 'a', 'z', 'i', 'l\n'],
    interests:
      "I love to learn new technologies and I'm always looking for new challenges and ",
    projects: 'open source projects',
    collaboration: 'to collaborate, so feel free to contact me.',
    projectsButton: 'my projects',
    projectsButtonTitle: 'Go to Projects.'
  },
  project: {
    slideButton: {
      left: 'Previous carousel item',
      right: 'Next carousel item',
      imagePreview: 'Change image preview'
    },
    ariaLabelDetails: 'Project details: {projectName}',
    githubButton: 'Project: {projectName} GitHub Repository',
    previewButton: 'Live Demo for the project: {projectName}',
    techAriaLabel: '{tech} icon'
  }
} as const;
