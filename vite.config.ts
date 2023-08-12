import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// const cellStyle = (date: string) => {
//   const isToday = date === todayDate;
//   const count = contributionsByDate[date] || 0;
//   const color = count > 0 ? styles.filled : styles.empty;

//   const cellStyles: React.CSSProperties = {
//     width: '14px',
//     height: '14px',
//     backgroundColor: isToday ? styles.today : color,
//     border: '1px solid #fff',
//     transition: 'background-color 0.3s ease',
//   };

//   return cellStyles;
// };
