import useTypeWriter from '@/hooks/useTypeWriter';

export default function TypeWriterIntro() {
  const words = [
    'User',
    'World',
    'Person',
    'Friend',
    'Everyone',
    'Stranger',
    'Folks',
    'Guest'
  ];

  const divClassName =
    'flex flex-col gap-4 items-center justify-center self-center';
  const introClassName = 'text-5xl lg:text-6xl font-bold';
  const typeWriterClass =
    'font-bold border-b-2 border-b-primary border-r-2 pr-1' +
    'animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto';
  const { currentWord, collapseClass } = useTypeWriter(words, );

  return (
    <div className={divClassName}>
      <div className="flex gap-2 text-2xl md:text-4xl ">
        <h1 className={introClassName}>Hello </h1>
        <span
          className={`${introClassName} ${typeWriterClass} ${collapseClass}`}
        >
          {words[currentWord]}
        </span>
        <span className={introClassName}>.</span>
      </div>
    </div>
  );
}
