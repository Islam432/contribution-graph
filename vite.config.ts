import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

/* ContributionGraph.css */

// body {
//   font-family: Arial, sans-serif;
//   margin: 0;
//   padding: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-color: #f0f0f0;
// }

// .contribution-graph {
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   grid-gap: 1px;
//   width: 350px; /* Задаем фиксированную ширину для таблицы */
// }

// .day-label {
//   text-align: center;
//   padding: 4px 0;
//   font-weight: bold;
//   color: #333;
//   background-color: #f0f0f0;
// }

// .date-row {
//   display: grid;
//   grid-template-rows: repeat(1, 1fr); /* Меняем количество строк */
//   grid-template-columns: repeat(357, 1fr);
// }

// .days-of-week-row {
//   display: grid;
//   grid-template-rows: repeat(7, 1fr);
//   grid-template-columns: repeat(1, 1fr); /* Меняем количество столбцов */
// }

// .contribution-cell {
//   width: 14px;
//   height: 14px;
//   background-color: #e1e4e8;
//   border: 1px solid #fff;
//   transition: background-color 0.3s ease;
// }

// .contribution-cell.today {
//   background-color: #4c6ef5;
// }

// .filled {
//   background-color: #ACD5f2;
// }

// .empty {
//   background-color: #EDEDED;
// }
