import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckSquare, Calendar, Award, Send } from 'lucide-react';

const InternDashboard = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [weeklyAnswers, setWeeklyAnswers] = useState({ q1: '', q2: '', q3: '' });

  // For visual demo, let's assume it's Sunday
  const isSunday = true;

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    // In a real app, API call here
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskText) {
       alert("Task submitted successfully!");
       setTaskText('');
    }
  };

  const handleWeeklySubmit = (e) => {
    e.preventDefault();
    alert("Weekly reflection submitted!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Welcome & Check-in */}
      <div className="card" style={{ background: 'var(--blue)', color: 'white', border: 'none' }}>
        <div className="card-padding" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Welcome back, {user?.name.split(' ')[0]}!</h2>
            <p style={{ opacity: 0.8, fontSize: '13px', marginTop: '4px' }}>Ready for another productive day at BrandSparc?</p>
          </div>
          <div>
            <button 
              onClick={handleCheckIn}
              disabled={isCheckedIn}
              style={{
                background: isCheckedIn ? 'rgba(255,255,255,0.2)' : 'white',
                color: isCheckedIn ? 'white' : 'var(--blue)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: isCheckedIn ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isCheckedIn ? <><ShieldCheck size={16} /> Checked In for Today</> : 'Check In Now'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid-three">
        {/* Left Column: Progress & Daily Task */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card">
             <div className="card-header"><div className="card-title">My Journey</div></div>
             <div className="card-padding">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                   <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--blue)' }}>Stage {user?.stage || 1}</span>
                   <span style={{ fontSize: '12px', color: 'var(--text3)' }}>Path to Stage { (user?.stage || 1) < 3 ? (user?.stage || 1) + 1 : 3 }</span>
                </div>
                <div className="progress-bar" style={{ height: '8px', marginBottom: '24px' }}>
                   <div className="progress-fill fill-blue" style={{ width: `${(user?.stage || 1) * 33.3}%` }}></div>
                </div>

                <div className="profile-stats">
                   <div className="pstat">
                      <div className="pstat-val" style={{ color: 'var(--gold, #D97706)' }}>
                         {user?.stage === 1 ? 'Explorer' : user?.stage === 2 ? 'Practitioner' : 'Allied'}
                      </div>
                      <div className="pstat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                         <Award size={12} /> Badge
                      </div>
                   </div>
                   <div className="pstat">
                      <div className="pstat-val" style={{ color: 'var(--green)' }}>{user?.attendance || 90}%</div>
                      <div className="pstat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                         <Calendar size={12} /> Attendance
                      </div>
                   </div>
                   <div className="pstat">
                      <div className="pstat-val" style={{ color: 'var(--blue)' }}>{user?.streak || 5}d</div>
                      <div className="pstat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                         🔥 Streak
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="card">
             <div className="card-header"><div className="card-title">Daily Task Submission</div></div>
             <div className="card-padding">
                <form onSubmit={handleTaskSubmit}>
                   <div className="form-group">
                      <label className="form-label">What did you accomplish today?</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Link your work, PRs, or document your progress here..."
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        required
                      ></textarea>
                   </div>
                   <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Send size={14} /> Submit Update
                   </button>
                </form>
             </div>
          </div>

        </div>

        {/* Right Column: Weekly Form */}
        <div>
          {isSunday && (
             <div className="card" style={{ border: '1px solid var(--blue-mid)' }}>
                <div className="card-header" style={{ background: 'var(--blue-light)' }}>
                   <div className="card-title" style={{ color: 'var(--blue)' }}>Weekly Reflection</div>
                </div>
                <div className="card-padding">
                   <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '16px' }}>It's Sunday! Time to reflect on your progress this week.</p>
                   <form onSubmit={handleWeeklySubmit}>
                      <div className="form-group">
                         <label className="form-label">1. What went well this week?</label>
                         <textarea 
                           className="form-textarea" 
                           style={{ minHeight: '60px' }} 
                           required 
                           value={weeklyAnswers.q1}
                           onChange={e => setWeeklyAnswers({...weeklyAnswers, q1: e.target.value})}
                         />
                      </div>
                      <div className="form-group">
                         <label className="form-label">2. What challenges did you face?</label>
                         <textarea 
                           className="form-textarea" 
                           style={{ minHeight: '60px' }} 
                           required 
                           value={weeklyAnswers.q2}
                           onChange={e => setWeeklyAnswers({...weeklyAnswers, q2: e.target.value})}
                         />
                      </div>
                      <div className="form-group">
                         <label className="form-label">3. Goals for next week?</label>
                         <textarea 
                           className="form-textarea" 
                           style={{ minHeight: '60px' }} 
                           required 
                           value={weeklyAnswers.q3}
                           onChange={e => setWeeklyAnswers({...weeklyAnswers, q3: e.target.value})}
                         />
                      </div>
                      <button type="submit" className="btn-primary" style={{ width: '100%' }}>Submit Reflection</button>
                   </form>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternDashboard;
