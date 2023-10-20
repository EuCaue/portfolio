export default function About() {
  return (
    <div className="flex flex-col items-center justify-center prose">
      <span className="text-4xl whitespace-pre-line leading-relaxed">
        <p className="text-4xl">
          Hi, my name is <span className="text-info">Cauê Souza</span>
        </p>
        I&apos;m a Full Stack Developer From{' '}
        <span className="from-blue-700 via-emerald-500 bg-gradient-to-r text-transparent bg-clip-text">
          Brazil.
        </span>{' '}
        I love to learn new technologies and I&apos;m always looking for new
        challenges, so feel free to contact me.
      </span>
      <a>click here</a>
    </div>
  );
}
