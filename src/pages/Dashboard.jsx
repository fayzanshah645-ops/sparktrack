import { AlertTriangle, CheckCircle2, ChevronUp, ChevronDown, Bell, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/interns')
      .then(res => res.json())
      .then(data => {
        setInterns(data.slice(0, 5)); // Just take 5 for dashboard
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching interns:', err);
        setLoading(false);
      });
  }, []);

  const stats = {
    total: interns.length,
    active: interns.filter(i => i.status === '绿').length,
    atRisk: interns.filter(i => i.status === '红').length,
    tasksSubmitted: interns.reduce((acc, i) => acc + i.tasks, 0)
  };

  const stageStats = {
    s1: interns.filter(i => i.stage === 1).length,
    s2: interns.filter(i => i.stage === 2).length,
    s3: interns.filter(i => i.stage === 3).length
  };

  const topPerformer = interns.length > 0 ? [...interns].sort((a, b) => b.streak - a.streak)[0] : null;

  return (
    <>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Interns</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-sub"><span className="stat-up">↑ Batch 01</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Today</div>
          <div className="stat-value" style={{color:'#16A34A'}}>{stats.active}</div>
          <div className="stat-sub"><span className="stat-up">{stats.total > 0 ? Math.round((stats.active/stats.total)*100) : 0}% check-in rate</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{stats.tasksSubmitted}</div>
          <div className="stat-sub"><span style={{color:'var(--text3)'}}>cumulative</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">At Risk</div>
          <div className="stat-value" style={{color:'#DC2626'}}>{stats.atRisk}</div>
          <div className="stat-sub"><span className="stat-down">Requires attention</span></div>
        </div>
      </div>

      <div className="grid-three">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Intern Activity</div>
            <Link to="/interns" className="card-action">View all</Link>
          </div>
          <div className="tab-row">
            <div className="tab active">All</div>
            <div className="tab">Active</div>
            <div className="tab">Inactive</div>
          </div>
          <div className="intern-list">
            {loading ? <div style={{padding:'20px'}}>Loading...</div> : interns.length === 0 ? <div style={{padding:'20px', color:'var(--text3)'}}>No interns found. Add one in the All Interns section.</div> : interns.map(intern => (
              <Link to={`/interns/${intern.id}`} className="intern-row" key={intern.id}>
                <div className={`status-dot ${intern.status === '绿' ? 'dot-green' : intern.status === '红' ? 'dot-red' : 'dot-amber'}`}></div>
                <div className="intern-avatar" style={{background:'var(--surface2)', color:'var(--text2)'}}>{intern.initials}</div>
                <div style={{flex:1}}><div className="intern-name">{intern.name}</div><div className="intern-stage">Tasks: {intern.tasks} · Attendance: {intern.attendance}%</div></div>
                <span className={`stage-badge s${intern.stage}`}>Stage {intern.stage}</span>
              </Link>
            ))}
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <div className="card">
            <div className="card-header"><div className="card-title">Stage Progress</div></div>
            <div className="progress-section">
              <div className="progress-row">
                <div className="progress-label"><span className="p-name">Stage 1 · Explorer</span><span className="p-val">{stageStats.s1} interns</span></div>
                <div className="progress-bar"><div className="progress-fill fill-blue" style={{width: stats.total > 0 ? `${(stageStats.s1/stats.total)*100}%` : '0%'}}></div></div>
              </div>
              <div className="progress-row">
                <div className="progress-label"><span className="p-name">Stage 2 · Practitioner</span><span className="p-val">{stageStats.s2} interns</span></div>
                <div className="progress-bar"><div className="progress-fill fill-green" style={{width: stats.total > 0 ? `${(stageStats.s2/stats.total)*100}%` : '0%'}}></div></div>
              </div>
              <div className="progress-row">
                <div className="progress-label"><span className="p-name">Stage 3 · Allied</span><span className="p-val">{stageStats.s3} interns</span></div>
                <div className="progress-bar"><div className="progress-fill fill-amber" style={{width: stats.total > 0 ? `${(stageStats.s3/stats.total)*100}%` : '0%'}}></div></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">This week logins</div></div>
            <div className="mini-chart">
              <div className="bar-chart">
                <div className="bar" style={{height:'35%'}}></div>
                <div className="bar" style={{height:'40%'}}></div>
                <div className="bar" style={{height:'25%'}}></div>
                <div className="bar" style={{height:'50%'}}></div>
                <div className="bar today" style={{height: stats.total > 0 ? '70%' : '5%'}}></div>
                <div className="bar" style={{height:'0%', opacity:0.3}}></div>
                <div className="bar" style={{height:'0%', opacity:0.3}}></div>
              </div>
              <div className="bar-labels">
                <div className="bar-label">Mon</div>
                <div className="bar-label">Tue</div>
                <div className="bar-label">Wed</div>
                <div className="bar-label">Thu</div>
                <div className="bar-label" style={{color:'var(--blue)', fontWeight:600}}>Fri</div>
                <div className="bar-label">Sat</div>
                <div className="bar-label">Sun</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-two">
        <div className="card">
          <div className="card-header"><div className="card-title">Recent Activity</div><Link to="/tasks" className="card-action">See all</Link></div>
          <div className="activity-feed">
            {interns.length === 0 ? (
              <div style={{padding:'20px', color:'var(--text3)', fontSize:'12px'}}>No recent activity.</div>
            ) : (
              <div className="activity-item">
                 <div className="act-icon act-blue"><ChevronUp size={14} color="var(--blue)" /></div>
                 <div><div className="act-text"><span className="act-name">{interns[0].name}</span> was recently added to the system.</div><div className="act-time">Just now</div></div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Top Performer</div></div>
          {topPerformer ? (
            <div className="intern-profile-mini">
              <div className="profile-top">
                <div className="profile-av">{topPerformer.initials}</div>
                <div>
                  <div className="profile-name">{topPerformer.name}</div>
                  <div className="profile-meta">Stage {topPerformer.stage} · {topPerformer.badge} · 🔥 {topPerformer.streak} day streak</div>
                </div>
              </div>
              <div className="profile-stats">
                <div className="pstat"><div className="pstat-val" style={{color:'#16A34A'}}>{topPerformer.attendance}%</div><div className="pstat-label">Attendance</div></div>
                <div className="pstat"><div className="pstat-val" style={{color:'#2563EB'}}>{topPerformer.tasks}</div><div className="pstat-label">Tasks done</div></div>
                <div className="pstat"><div className="pstat-val" style={{color:'#D97706'}}>{topPerformer.streak}d</div><div className="pstat-label">Streak</div></div>
              </div>
            </div>
          ) : (
            <div style={{padding:'20px', color:'var(--text3)', fontSize:'12px'}}>No performers yet.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
