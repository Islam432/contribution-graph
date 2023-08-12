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
