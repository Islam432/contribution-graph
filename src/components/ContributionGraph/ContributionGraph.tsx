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
        console.error('ошибка при получении данных:', error);
      }
    };

    fetchContributions();
  }, []);



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
    
   <div className="cont" >
          
        <div className="contribution-graph">
          
       
        {dateRange.map(date => {
  const { cellClasses, range } = cellStyle(date);
  return (
    <div
      key={date}
      className={cellClasses}
      data-count={contributions[date] || 0}
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
