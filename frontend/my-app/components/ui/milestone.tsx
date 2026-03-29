export const MilestoneSticker = ({ text }: { text: string }) => (
  <div style={{
    padding: '10px 15px',
    background: '#fff',
    border: '2px solid black',
    boxShadow: '3px 3px 0px black',
    rotate: `${(Math.random() * 4 - 2)}deg`, // Random slight rotation for 2D feel
    display: 'inline-block',
    margin: '5px',
    fontWeight: 'bold',
    fontSize: '0.85rem'
  }}>
    {text}
  </div>
);