# CheckBox

This is an CheckBox component. please click see the animation

```jsx
import { CheckBox } from 'react-shuang';
import { useState } from 'react';
export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <CheckBox text="hello checkbox" checked={checked} onChange={setChecked} />
    </>
  );
};
```
