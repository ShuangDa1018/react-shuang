---
order: 0
title: Overview
apiHeader: false
nav:
  title: Components
  order: 4
---

# Install

```
npm install react-shuang
```

## Usage

If you want to use the components provided by `react-shuang` independently, you need to manually wrap them with `Button`, for example:

```tsx | pure
import { Button } from 'react-shuang';

export default () => {
  return <Button>click me</Button>;
};
```

But if you are reusing components under `react-shuang`, you do not need to wrap them with `Button`. The theme package will automatically wrap the document with `Button`, as detailed in the [source code](https://github.com/ShuangDa1018/react-shuang/tree/main/src/Button/index.tsx).
