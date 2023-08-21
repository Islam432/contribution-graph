import React from 'react';
import ky from 'ky';
import './ContributionGraph.css';
import { useQuery } from '@tanstack/react-query';

interface ContributionData {
  [date: string]: number;
}

const ContributionGraph: React.FC = () => {
  const today: Date = new Date();
  const todayDate: string = today.toISOString().split('T')[0];

  const isId = 1;
  const { isLoading, data } = useQuery<ContributionData, Error>(['todo', isId], async () => {
    const response = await ky.get('https://dpg.gg/test/calendar.json').json() as ContributionData;
    return response;
  });

  const dateRange: string[] = [];
  for (let i = 0; i < 357; i++) {
    const date: Date = new Date(today);
    date.setDate(today.getDate() - i);
    dateRange.push(date.toISOString().split('T')[0]);
  }

  const cellStyle = (date: string) => {
    const isToday = date === todayDate;
    const count = data?.[date] || 0;

    let color = 'empty';
    let rag = 'no contributions';

    if (count >= 1 && count <= 9) {
      color = 'lowContributions';
      rag = '1-9 contributions';
    } else if (count >= 10 && count <= 30) {
      color = 'mediumContributions';
      rag = '10-30 contributions';
    } else if (count > 30) {
      color = 'highContributions';
      rag = '30+ contributions';
    }

    const classes = [
      'contribution-cell',
      isToday ? 'today' : color,
    ].join(' ');

    return { classes, rag };
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cont">
      <div className="contribution-graph">
        {dateRange.map(date => {
          const { classes, rag } = cellStyle(date);

          return (
            <div key={date} className={classes} data-count={data?.[date] || 0}>
              <span className="tooltip">{rag}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContributionGraph;
