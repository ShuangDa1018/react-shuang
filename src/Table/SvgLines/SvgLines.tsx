import React, { useEffect, useState } from 'react';
import { LineItem } from '..';
interface SvgLinesProps {
  lineList: LineItem[];
  tableRef: React.RefObject<HTMLTableElement>;
}

export default function SvgLines({ lineList, tableRef }: SvgLinesProps) {
  const [lines, setLines] = useState<(LineItem & { _props: LineItem })[]>([]);

  const calculateLinePixelPositions = () => {
    const rows = tableRef.current?.querySelectorAll('tbody tr');
    const containerRect = tableRef.current?.getBoundingClientRect();
    if (!rows || !containerRect) return;
    const pixelLines: typeof lines = [];
    lineList.forEach(({ fromX, fromY, targetX, targetY }) => {
      const fromRow = rows[fromX] as HTMLTableRowElement;
      const toRow = rows[targetX] as HTMLTableRowElement;
      if (!fromRow || !toRow) return;

      const fromCell = fromRow.querySelectorAll('td')[fromY] as HTMLElement;
      const toCell = toRow.querySelectorAll('td')[targetY] as HTMLElement;
      if (!fromCell || !toCell) return;

      const fromRect = fromCell.getBoundingClientRect();
      const toRect = toCell.getBoundingClientRect();

      pixelLines.push({
        fromX: fromRect.left + fromRect.width / 2 - containerRect.left,
        fromY: fromRect.top + fromRect.height / 2 - containerRect.top,
        targetX: toRect.left + toRect.width / 2 - containerRect.left,
        targetY: toRect.top + toRect.height / 2 - containerRect.top,
        _props: { fromX, fromY, targetX, targetY },
      });
    });

    setLines(pixelLines);
  };

  useEffect(() => {
    calculateLinePixelPositions();
  }, [lineList]);
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} width="100%" height="100%">
      {lines.map((line, index) => (
        <line key={index} x1={line.fromX} y1={line.fromY} x2={line.targetX} y2={line.targetY} stroke="#EA5038" strokeWidth="1.5" />
      ))}
      {(() => {
        const pointMap = new Map<string, { x: number; y: number; count: number }>();
        for (let i = 0; i < lines.length; i++) {
          const { fromX, fromY, targetX, targetY, _props } = lines[i];
          const round = (n: number) => Math.round(n);
          const add = (x: number, y: number, count: number) => {
            const key = `${x},${y}`;
            pointMap.set(key, {
              x,
              y,
              count,
            });
          };

          if (i === 0) add(round(fromX), round(fromY), _props.fromY - 1);
          add(round(targetX), round(targetY), _props.targetY - 1);
        }

        return Array.from(pointMap.values()).map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="10" fill="#EA5038" />
            <text x={pt.x} y={pt.y + 4} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
              {pt.count}
            </text>
          </g>
        ));
      })()}
    </svg>
  );
}
