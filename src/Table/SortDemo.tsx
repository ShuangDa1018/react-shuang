import { useEffect, useState } from 'react';
import { Table, TableColumn } from '.';
import './SortDemo.scss';
import sortData from './sortData.json';

export function SortDemo() {
  const maxNum = 8;
  const columns: TableColumn[] = [
    {
      name: '号码',
      key: 'lotteryItem',
      render: (text: number) => (
        <div className="number-box">
          <div className="number">{text}</div>
        </div>
      ),
      sorter: true,
    },
    {
      name: `2期出现次数`,
      key: 'hitsCount',
      style: { paddingLeft: 0 },
      render: (text: string) => (
        <div className="occurrence">
          <div className="chart" style={{ width: `${(Number(text) / maxNum) * 100}%` }}></div>
          <div className="num">{text}</div>
        </div>
      ),
      sorter: true,
    },
    {
      name: '当前遗漏',
      key: 'currentMissing',
      sorter: true,
    },
    {
      name: '平均遗漏',
      key: 'avgMissing',
      sorter: true,
    },
  ];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="base-trend">
      <Table columns={columns} dataSource={sortData['hundredPlace']} loading={loading}></Table>
    </div>
  );
}
