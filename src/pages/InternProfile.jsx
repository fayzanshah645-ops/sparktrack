import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

const InternProfile = () => {
  const { id } = useParams();
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/interns/${id}`)
      .then(res => res.json())
      .then(data => {
        setIntern(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching intern:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '20px' }}>Loading profile...</div>;
  if (!intern) return <div style={{ padding: '20px' }}>Intern not found...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ marginBottom: '8px' }}>
        <Link to="/interns" className="card-action" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={14} /> Back to all interns
        </Link>
      </div>

      <div className="card">
        <div className="card-padding" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="profile-av" style={{ width: '80px', height: '80px', fontSize: '24px' }}>{intern.initials}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text1)', marginBottom: '4px' }}>{intern.name}</h1>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text2)', fontSize: '13px', marginBottom: '12px' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> intern@example.com</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> N/A</span>
            </div>
            <span className={`stage-badge s${intern.stage}`} style={{ fontSize: '11px', padding: '4px 10px' }}>Stage {intern.stage} · {intern.badge}</span>
          </div>
        </div>
      </div>

      <div className="grid-two">
        <div className="card">
          <div className="card-header"><div className="card-title">Performance Stats</div></div>
          <div className="profile-stats card-padding">
            <div className="pstat"><div className="pstat-val" style={{color:'#16A34A'}}>{intern.attendance}%</div><div className="pstat-label">Attendance</div></div>
            <div className="pstat"><div className="pstat-val" style={{color:'#2563EB'}}>{intern.tasks}</div><div className="pstat-label">Tasks Done</div></div>
            <div className="pstat"><div className="pstat-val" style={{color:'#D97706'}}>{intern.streak}d</div><div className="pstat-label">Streak</div></div>
          </div>
        </div>

        <div className="card">
           <div className="card-header"><div className="card-title">Attendance Heatmap (March)</div></div>
           <div className="card-padding" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} title={`Day ${i+1}`} style={{
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '4px', 
                  background: i % 7 === 0 ? 'var(--red-light)' : (i > 25 ? 'var(--surface2)' : 'var(--green-light)'),
                  border: i % 7 === 0 ? '1px solid var(--red)' : (i > 25 ? '1px solid var(--border)' : '1px solid var(--green)')
                }}></div>
              ))}
           </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header"><div className="card-title">Task Submission History</div></div>
        <div className="intern-list">
          <div style={{ padding: '20px', color: 'var(--text3)', fontSize: '12px', textAlign: 'center' }}>
            No task submissions recorded for {intern.name} yet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternProfile;
