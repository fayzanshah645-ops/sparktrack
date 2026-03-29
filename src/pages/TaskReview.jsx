import { CheckCircle2, AlertTriangle } from 'lucide-react';

const TaskReview = () => {
  const mockTasks = [
    { id: 1, internName: 'Amir Ali', stage: 2, desc: 'Created reusable React components for the Dashboard UI. Attached GitHub repo link.', date: 'Today, 2:30 PM' },
    { id: 2, internName: 'Kaleem Mir', stage: 2, desc: 'Designed the database schema for the new e-commerce project.', date: 'Yesterday, 4:15 PM' },
    { id: 3, internName: 'Zara Ahmed', stage: 1, desc: 'Wrote a 500-word analysis on competitive products in the SaaS space.', date: 'Mar 12, 11:00 AM' }
  ];

  return (
    <div className="card">
      <div className="card-header">
         <div className="card-title">Pending Task Reviews</div>
      </div>
      <div className="intern-list">
        {mockTasks.map(task => (
           <div key={task.id} className="intern-row" style={{ alignItems: 'flex-start', padding: '16px 20px' }}>
              <div className="intern-avatar" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>{task.internName.split(' ')[0][0]}{task.internName.split(' ')[1][0]}</div>
              <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px' }}>{task.internName}</span>
                    <span className={`stage-badge s${task.stage}`}>Stage {task.stage}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text3)', marginLeft: 'auto' }}>{task.date}</span>
                 </div>
                 <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.5', marginBottom: '12px' }}>
                    {task.desc}
                 </div>
                 <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '12px', background: 'var(--green)' }}>
                       <CheckCircle2 size={12} /> Approve
                    </button>
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '12px', background: 'var(--surface)', color: 'var(--red)', border: '1px solid var(--border)' }}>
                       <AlertTriangle size={12} /> Flag Issue
                    </button>
                 </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default TaskReview;
