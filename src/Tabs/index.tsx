import { CSSProperties } from 'react';
import './index.scss';
interface tab {
  title: string;
  key: string;
}
interface TabComProps {
  tabList: tab[];
  activeKey: string;
  setActiveKey: (key: string) => void;
}
export function Tabs(props: TabComProps) {
  const { tabList = [], activeKey, setActiveKey } = props;
  const handleTab = (tab: tab) => {
    setActiveKey(tab.key);
  };
  const style = {
    '--item-width': `calc(100% / ${tabList.length})`,
    '--active-left': tabList.findIndex((item) => item.key === activeKey),
  } as CSSProperties;

  return (
    <div className="tab-com" style={style}>
      {tabList.map((tab) => {
        return (
          <div className={`tab-item ${tab.key === activeKey ? 'tab-item-active' : ''}`} key={tab.key} onClick={() => handleTab(tab)}>
            {tab.title}
          </div>
        );
      })}
    </div>
  );
}
