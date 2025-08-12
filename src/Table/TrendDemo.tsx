import { useMemo, useRef, useState } from 'react';
import { LineItem, Table, TableColumn } from 'react-shuang';
import './TrendDemo.scss';
import baseTrend from './baseTrend.json';
export function TrendDemo() {
  const placeList = [
    {
      label: '百位',
      key: 'hundredPlace',
    },
    {
      label: '十位',
      key: 'tenPlace',
    },
    {
      label: '个位',
      key: 'onePlace',
    },
  ];
  const showMissingLayers = true;
  const showMissingData = true;
  const missObj = useRef<Record<number, number>>({});
  const [lineList, setLineList] = useState<LineItem[]>([]);
  const showPolyline = true; // 折线
  const [activeIndex] = useState(0);
  const showBottomStats = true; // 底部统计

  const renderData = useMemo(() => {
    if (!baseTrend) return [];
    const place = placeList[activeIndex].key as 'onePlace' | 'tenPlace' | 'hundredPlace';
    const { hitsList, avgMissList, amxMissList, repeatList, lotteryTrendList } = baseTrend;
    setLineList([]);
    if (showPolyline) {
      let list: typeof lineList = [];
      lotteryTrendList.forEach((item, index) => {
        const { lotteryItem } = item[place];
        if (list[0]) {
          const last = list[list.length - 1];
          list.push({
            fromX: last.targetX,
            fromY: last.targetY,
            targetX: index,
            targetY: lotteryItem + 1,
          });
        } else {
          list.push({ fromX: -1, fromY: -1, targetX: index, targetY: lotteryItem + 1 });
        }
      });
      setLineList(list);
    }
    const data: any[] = lotteryTrendList.map((item) => {
      const { lotteryItem, lotteryMissingCount } = item[place];
      return {
        periodNum: item.periodNum,
        lotteryItem,
        ...Object.fromEntries(lotteryMissingCount.map((value, index) => [index, value])),
      };
    });
    if (!showBottomStats) {
      return data;
    }
    if (showMissingLayers) {
      missObj.current = {};
      data.forEach((item, index) => {
        if (missObj.current[item.lotteryItem] === undefined) {
          missObj.current[item.lotteryItem] = index;
        }
      });
    }
    return data.concat([
      {
        key: 'hits',
        periodNum: <span style={{ color: '#8A8A8A' }}>出现次数</span>,
        style_: { background: '#FEF3F1', color: '#262626' },
        list: hitsList[place],
        render_: true,
      },
      {
        key: 'avgMiss',
        periodNum: <span style={{ color: '#8A8A8A' }}>平均遗漏</span>,
        style_: { background: '#fff', color: '#262626' },
        list: avgMissList[place],
        render_: true,
      },
      {
        key: 'amxMiss',
        periodNum: <span style={{ color: '#8A8A8A' }}>最大遗漏</span>,
        style_: { background: '#FEF3F1', color: '#262626' },
        list: amxMissList[place],
        render_: true,
      },
      {
        key: 'repeat',
        periodNum: <span style={{ color: '#8A8A8A' }}>最大连出</span>,
        style_: { background: '#fff', color: '#262626' },
        list: repeatList[place],
        render_: true,
      },
    ]);
  }, [baseTrend, showBottomStats, showMissingLayers, showPolyline, activeIndex]);
  const columns: TableColumn[] = [
    {
      name: '期次',
      key: 'periodNum',
      render: (text: any, record: Record<string, any>) => {
        return record.render_ ? text : text?.slice(4);
      },
    },
    ...Array.from({ length: 10 }, (_, num) => {
      return {
        name: num,
        key: String(num),
        style: {
          padding: 0,
          width: '33.2rem',
          borderBottomColor: showMissingLayers ? 'rgba(63, 126, 255, 0.20)' : '#f5f5f5',
        },
        render: (text: any, record: Record<string, any>, index: number, idx: number) => {
          let content: React.ReactNode;
          let showLayers = false;
          if (showMissingLayers) {
            showLayers = missObj.current[idx - 1] === undefined ? true : missObj.current[idx - 1] > index;
          }
          if (record.render_) {
            content = record.list[idx - 1];
            showLayers = false;
          } else if (record.lotteryItem === idx - 1) {
            content = <div className="lottery-item">{idx - 1}</div>;
          } else {
            content = showMissingData ? text : <div style={{ opacity: 0 }}>{text}</div>;
          }

          return (
            <div className="render-wrapper" data-layers={showLayers}>
              {content}
            </div>
          );
        },
      };
    }),
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Table columns={columns} dataSource={renderData} lineList={lineList}></Table>
    </div>
  );
}
