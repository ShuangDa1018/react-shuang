# CheckBox

This is an CheckBox component.

loading.

```jsx
import { CheckBox } from 'react-components-s';
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
