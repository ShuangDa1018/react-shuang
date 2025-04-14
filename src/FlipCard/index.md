# FlipCard

This is an FlipCard component. please click see the animation

```jsx
import { FlipCard } from 'react-shuang';
export default () => {
  return (
    <div style={{ width: 150 }}>
      <FlipCard front={<div>i am front</div>} back={<div style={{ width: '100%', height: '100%', background: '#1677ff' }}>i am front</div>} />
    </div>
  );
};
```

```jsx
import { FlipCard } from 'react-shuang';
export default () => {
  return (
    <div style={{ width: 150 }}>
      <FlipCard rotate="x" front={<div>i am front</div>} back={<div style={{ width: '100%', height: '100%', background: '#1677ff' }}>i am front</div>} />
    </div>
  );
};
```
