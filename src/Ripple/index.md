# Ripple

This is an Ripple component. please click see the animation

```jsx
import { addRipple, deleteRipple } from 'react-shuang';
import { useState, useEffect, useRef } from 'react';
export default () => {
  const [checked, setChecked] = useState(true);
  const domRef = useRef(null);
  useEffect(() => {
    addRipple(domRef.current);
    return () => {
      deleteRipple(domRef.current);
    };
  }, []);
  return (
    <>
      <div ref={domRef} style={{ width: 200, height: 200, background: '#424290', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        click me
      </div>
    </>
  );
};
```
