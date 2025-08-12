import clsx from 'clsx';
import { CSSProperties, forwardRef, ReactNode, useMemo, useRef, useState } from 'react';
import { Empty } from '../Empty';
import { Loading } from '../Loading';
import './index.scss';
import SvgLines from './SvgLines/SvgLines';

export interface TableColumn {
  name?: ReactNode;
  key: string;
  style?: CSSProperties;
  sorter?: boolean;
  render?: (text: any, record: Record<string, any>, index: number, idx: number) => React.ReactNode;
}

export interface TableRef {
  reset: () => void;
}
export type LineItem = { fromX: number; fromY: number; targetX: number; targetY: number };

interface TableProps {
  columns: TableColumn[];
  dataSource?: any[];
  rowClick?: (item: any) => void;
  className?: string;
  lineList?: LineItem[];
  loading?: boolean;
}

export const Table = forwardRef<TableRef, TableProps>((props) => {
  const { columns, dataSource = [], className, lineList, loading } = props;
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [sortMap, setSortMap] = useState<Record<string, any>>({});

  const handleHead = (it: TableColumn) => {
    if (it.sorter) {
      setSortMap({
        key: it.key,
        sortTop: it.key === sortMap.key ? !sortMap.sortTop : true,
      });
    }
  };
  const renderDataSource = useMemo(() => {
    const sortObj = columns.find((it) => it.key === sortMap.key);
    return sortObj
      ? dataSource.sort((a, b) => {
          const valA = a[sortObj.key];
          const valB = b[sortObj.key];
          return sortMap.sortTop ? valA - valB : valB - valA;
        })
      : dataSource;
  }, [columns, sortMap, dataSource]);

  return (
    <div className="table-bet-com">
      <table className={clsx('record-list', className)} ref={tableRef}>
        <thead>
          <tr className="record-list-title">
            {columns.map((it, index) => (
              <th className={clsx('record-list-col _click_line')} key={index} style={it.style} onClick={() => handleHead(it)}>
                {it.sorter ? (
                  <div className="list-title ">
                    {it.name}
                    <span className="sort-icon">
                      <svg
                        data-red={it.key === sortMap.key && sortMap.sortTop}
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="5"
                        viewBox="0 0 9 5"
                        fill="currentColor"
                      >
                        <path d="M4.5 0L7.9641 3.75H1.0359L4.5 0Z" />
                      </svg>
                      <svg
                        data-red={it.key === sortMap.key && !sortMap.sortTop}
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="5"
                        viewBox="0 0 9 5"
                        fill="currentColor"
                      >
                        <path d="M4.5 0L7.9641 3.75H1.0359L4.5 0Z" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  it.name
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ background: '#F5F8FF' }}>
                <Loading></Loading>
              </td>
            </tr>
          ) : renderDataSource.length > 0 ? (
            renderDataSource.map((item, index) => (
              <tr className="record-list-row" key={index}>
                {columns.map((col, idx) => (
                  <td style={col.style || item.style_} className={'record-list-col text-hidden'} key={col.key}>
                    {col.render ? col.render(item[col.key], item, index, idx) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ background: '#F5F8FF' }}>
                <Empty />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {lineList && lineList.length > 0 && <SvgLines tableRef={tableRef} lineList={lineList}></SvgLines>}
    </div>
  );
});

export { SortDemo } from './SortDemo';
export { TrendDemo } from './TrendDemo';
