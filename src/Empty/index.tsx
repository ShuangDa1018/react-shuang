import img_empty from './img_empty.svg';
import './index.scss';
interface EmptyProps {
  className?: string;
}

export function Empty({ className }: EmptyProps) {
  return (
    <div className={`rs-empty ${className}`}>
      <img src={img_empty} alt="" />
      暂无数据
    </div>
  );
}
