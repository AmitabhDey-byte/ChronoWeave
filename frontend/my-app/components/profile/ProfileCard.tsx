import { Card } from '../ui/card';
import { Edit3 } from 'lucide-react';

export const ProfileCard = ({ name, bio }: { name: string, bio: string }) => (
  <Card className="profile-card">
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <div style={{ 
        width: '100px', height: '100px', margin: '0 auto 15px',
        border: '4px solid black', borderRadius: '50%', backgroundColor: '#e0e0e0' 
      }} />
      <h2 style={{ margin: '0' }}>{name}</h2>
      <p style={{ color: '#666' }}>{bio}</p>
      <button style={{ position: 'absolute', top: 0, right: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
        <Edit3 size={20} />
      </button>
    </div>
  </Card>
);