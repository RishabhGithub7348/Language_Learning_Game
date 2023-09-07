import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Circular({ value, color }) {
    const percentage = (value / 10) * 100;
  return (
    <div style={{ width: 70, height: 70 }}>
    <CircularProgressbar
      value={percentage / 100} // Divide by 100 to normalize to a value between 0 and 1
      text={`${percentage}%`}
      styles={{
        // Customize the color of the progress bar based on the "color" prop
        path: {
          stroke: color,
        },
        text: {
          fill: color,
          fontSize: '24px',
        },
      }}
    />
  </div>
  );
}
