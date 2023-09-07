import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgress({ value, color }) {
  // Calculate the percentage based on the value out of 40
  const percentage = (value / 40) * 100;

  return (
    <div style={{ width: 170, height: 170 }}>
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
