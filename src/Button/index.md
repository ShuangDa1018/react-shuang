# Button

This is an Button component. please click see the animation

```jsx
import { Button } from 'react-shuang';
import { useState } from 'react';
export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ width: 150 }}>
      <Button text="hello Button" checked={checked} onChange={setChecked} />
    </div>
  );
};
```
