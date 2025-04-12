# Tabs

This is an Tabs component. please click see the animation

```jsx
import { Tabs } from 'react-shuang';
import { useState } from 'react';
export default () => {
  const [activeKey, setActiveKey] = useState('all');
  const tabList = [
    {
      title: 'All',
      key: 'all',
    },
    {
      title: 'Hot',
      key: 'hot',
    },
    {
      title: 'Recent',
      key: 'recent',
    },
    {
      title: 'Favorite',
      key: 'favorite',
    },
  ];
  return <Tabs tabList={tabList} activeKey={activeKey} setActiveKey={setActiveKey}></Tabs>;
};
```
