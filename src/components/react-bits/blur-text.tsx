// Adapted from React Bits "BlurText" (reactbits.dev). The word-by-word blur-in runs as a CSS
// animation (see .blur-word in globals.css), so the name is visible before JavaScript loads and
// stays still for visitors who prefer reduced motion. Hidden from assistive tech; the parent carries the text.
type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

export default function BlurText({ text, className, delay = 120 }: BlurTextProps) {
  const words = text.split(" ");
  return (
    <span aria-hidden="true" className={className}>
      {words.map((word, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: words can repeat, order never changes
          key={index}
          className="blur-word inline-block"
          style={{ animationDelay: `${index * delay}ms` }}
        >
          {word}
          {index < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
