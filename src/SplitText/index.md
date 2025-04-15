# SplitText

This is an SplitText component. please click see the animation

```jsx
import { SplitText } from 'react-shuang';
export default () => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <SplitText
      text="Hello, React-shuang! space check"
      className="text-2xl font-semibold text-center"
      delay={100}
      animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
      easing="easeOutCubic"
      threshold={0.2}
      rootMargin="-50px"
      onLetterAnimationComplete={handleAnimationComplete}
    />
  );
};
```
