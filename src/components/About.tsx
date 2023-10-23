export default function About() {
  return (
    <div className="flex flex-col items-center justify-center prose md:prose-md">
      <span className="text-3xl lg:text-4xl whitespace-pre-line leading-relaxed">
        <p className="text-4xl">
          Hi, my name is{' '}
          <span className="text-success dark:text-info">Cauê Souza.</span>
        </p>
        I&apos;m a{' '}
        <span className="text-base-content">Full Stack Developer</span> From{' '}
        <span className="text-green-400">B</span>
        <span className="text-yellow-300">r</span>
        <span className="text-blue-400">a</span>
        <span className="text-green-400">z</span>
        <span className="text-yellow-300">i</span>
        <span className="text-blue-400">l</span> I love to learn new
        technologies and I&apos;m always looking for new challenges and{' '}
        <span className="text-base-content">open source projects</span> to
        collaborate, so feel free to contact me.
      </span>
      <a
        href="#projects"
        className="cursor-pointer text-sm hover:scale-125 transition-all duration-75 ease-in mt-2"
      >
        my projects
      </a>
    </div>
  );
}
