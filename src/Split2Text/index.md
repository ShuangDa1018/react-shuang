# Split2Text

This is an Split2Text component. please click see the animation

```jsx
import { Split2Text } from 'react-shuang';
import { useState } from 'react';
export default () => {
  return <Split2Text text="Split2Text,is from react-shuang !" />;
};
```

custom animation

```jsx
import { Split2Text } from 'react-shuang';
import { useState } from 'react';
export default () => {
  return (
    <>
      <Split2Text text="Split2Text,is from react-shuang !" animationName="ripple" />
      <Split2Text text="Split2Text,is from react-shuang !" animationName="circleChange" />
    </>
  );
};
```
