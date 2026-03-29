import { Award, Download } from 'lucide-react';

const Certificates = () => {
  const eligibleInterns = [
    { id: 4, name: 'Rayan Ahmad', stage: 3, attendance: 96, tasksComplete: 8 },
    { id: 10, name: 'Omar Farooq', stage: 3, attendance: 88, tasksComplete: 7 },
  ];

  return (
    <div className="card">
      <div className="card-header">
         <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
           <Award size={16} color="var(--amber)" /> Eligible for Graduation Certificate
         </div>
      </div>
      <div className="card-padding" style={{ fontSize: '13px', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>
         Interns must have &gt;70% attendance, complete 6/8 weekly tasks, and finish all 3 stages.
      </div>
      <div className="intern-list">
        {eligibleInterns.map(intern => (
           <div key={intern.id} className="intern-row" style={{ padding: '16px 20px' }}>
              <div style={{ flex: 1 }}>
                 <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text1)' }}>{intern.name}</div>
                 <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px' }}>
                   {intern.attendance}% Attendance · {intern.tasksComplete}/8 Tasks
                 </div>
              </div>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                 <Download size={14} /> Generate Certificate
              </button>
           </div>
        ))}
        {eligibleInterns.length === 0 && (
           <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text3)', fontSize: '13px' }}>
              No interns are currently eligible for certificates.
           </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
