import { Spinner } from './Spinner';

export const FullScreenLoader = () => (
  <div style={{ 
    position: 'fixed', inset: 0, backgroundColor: 'rgba(255,255,255,0.8)', 
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 100 
  }}>
    <Spinner />
    <p style={{ marginTop: '20px', fontWeight: 'bold', fontFamily: 'monospace' }}>WEAVING YOUR CHRONO-PATH...</p>
  </div>
);