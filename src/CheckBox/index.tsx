import React, { FC } from 'react';
import './index.scss';

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  text?: string;
  className?: string;
}

const CheckBox: FC<CheckBoxProps> = (props) => {
  const { checked, onChange, className, text = '', ...otherProps } = props;
  const cls = ['custom-close-action-box', className].filter(Boolean).join(' ');

  return (
    <div
      className={`${cls} ${checked ? 'btnChecked' : ''}`}
      onClick={() => onChange(!checked)}
      {...otherProps}
    >
      <span className="icon-ignore">
        <svg viewBox="0 0 12 10" height="10px" width="12px">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      {text && <span className="check-text">{text}</span>}
    </div>
  );
};
export default CheckBox;
