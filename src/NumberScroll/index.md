# NumberScroll

This is an number scroll component.

```jsx
import { NumberScroll } from 'react-shuang';

export default () => <NumberScroll value="123,456,789.00" />;
```

loading.

```jsx
import { NumberScroll } from 'react-shuang';
import { useState } from 'react';
export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <NumberScroll value="123,456,789.00" loading={loading} />
      <button onClick={() => setLoading(!loading)}>{loading ? 'stop' : 'start'}</button>
    </>
  );
};
```
