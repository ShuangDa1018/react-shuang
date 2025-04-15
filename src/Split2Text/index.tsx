import './index.scss';
interface Split2TextProps {
  text: string;
  animationName?: string;
}
export function Split2Text({ text, animationName = 'rs-twister' }: Split2TextProps) {
  return (
    <div className="rs-split2-text">
      {text.split('').map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            animationName,
            animationDelay: `${wordIndex * 0.05}s`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
