# CheckBox

This is an CheckBox component. please click see the animation

```jsx
import { CheckBox } from 'react-shuang';
import { useState } from 'react';
export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ background: '#000000', padding: 10 }}>
      <CheckBox text="hello checkbox" checked={checked} onChange={setChecked} />
    </div>
  );
};
```
