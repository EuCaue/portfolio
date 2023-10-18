import useTypeWriter from "@/hooks/useTypeWriter";

export default function TypeWriterIntro() {
  const words = ["User", "World", "Person", "People"];
  const divClassName =
    "flex flex-col gap-4 items-center justify-center self-center";
  const introTextClassName = "text-5xl lg:text-6xl font-bold";
  const typeWriterClass =
    "font-bold border-b-2 border-b-blue-400 border-r-2 pr-1" +
    "animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto";
  const { currentWord, collapseClass } = useTypeWriter(words);

  return (
    <div className={divClassName}>
      <div className="flex gap-2 text-2xl md:text-4xl ">
        <h1 className={introTextClassName}>Hello </h1>
        <span
          className={`${introTextClassName}${typeWriterClass}${collapseClass}`}
        >
          {words[currentWord]}
        </span>
        <span className={introTextClassName}>.</span>
      </div>
    </div>
  );
}
