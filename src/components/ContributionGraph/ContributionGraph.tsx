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

//   const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today: Date = new Date();
  const todayDate: string = today.toISOString().split('T')[0];

  const dateRange: string[] = [];
  for (let i = 0; i < 357; i++) {
    const date: Date = new Date(today);
    date.setDate(today.getDate() - i);
    dateRange.push(date.toISOString().split('T')[0]);
  }

  const cellStyle = (date: string) => {
    const isToday = date === todayDate;
    const count = contributions[date] || 0;
  
    
  };
  return (
    <div className="contribution-graph">
      <div className="day-label" />

      {dateRange.map(date => (
        <div
          key={date}
          className={cellStyle(date)}
          data-count={contributions[date] || 0}
        />
      ))}
    </div>
  );
};

export default ContributionGraph;
