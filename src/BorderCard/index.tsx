import './index.scss';
interface BorderCardProps {
  children?: React.ReactNode;
}
export function BorderCard({ children }: BorderCardProps) {
  return (
    <button type="button" className="rs-border-card">
      <div className="rs-border-card-content">
        <span className="rs-border-card-text">{children}</span>
      </div>
    </button>
  );
}
