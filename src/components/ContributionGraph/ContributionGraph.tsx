import React, { useEffect, useState } from 'react';
import ky from 'ky';
import './ContributionGraph.css'; // Импортируйте стили из вашего CSS-файла

interface ContributionData {
  [date: string]: number;
}

const ContributionGraph: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionData>({});

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const data: ContributionData = await ky.get('https://dpg.gg/test/calendar.json').json();
        setContributions(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchContributions();
  }, []);

  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate: Date = new Date(today);
  endDate.setDate(endDate.getDate() - 50 * 7);

  const dateRange: Date[] = [];
  for (let date = today; date >= endDate; date.setDate(date.getDate() - 1)) {
    dateRange.push(new Date(date));
  }

  const cellStyle = (date: Date) => {
    const isToday = date.toISOString() === today.toISOString();
    const count = contributions[date.toISOString().split('T')[0]] || 0;

    let color = 'empty';
    let range = '';

    if (count >= 1 && count <= 9) {
      color = 'lowContributions';
      range = '1-9';
    } else if (count >= 10 && count <= 30) {
      color = 'mediumContributions';
      range = '10-30';
    } else if (count > 30) {
      color = 'highContributions';
      range = '31+';
    }

    const cellClasses = [
      'contribution-cell',
      isToday ? 'today' : color,
    ].join(' ');

    return { cellClasses, range };
  };

  return (
    <div className="cont">
      <div className="contribution-graph">
        <div className="days-of-week-row">
          <div className="day-label" />
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-label">{day}</div>
          ))}
        </div>
        {dateRange.map(date => {
          const { cellClasses, range } = cellStyle(date);
          return (
            <div
              key={date.toISOString().split('T')[0]}
              className={cellClasses}
              data-count={contributions[date.toISOString().split('T')[0]] || 0}
            >
              <span className="tooltip">{range}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContributionGraph;
