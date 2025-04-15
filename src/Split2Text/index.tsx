import './index.scss';
interface Split2TextProps {
  text: string;
}
export function Split2Text({ text }: Split2TextProps) {
  return (
    <div className="rs-split2-text">
      {text.split('').map((word, wordIndex) => (
        <span key={wordIndex} style={{ animationDelay: `${wordIndex * 0.05}s`, minWidth: '0.3em' }}>
          {word}
        </span>
      ))}
    </div>
  );
}
