import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MoreVertical } from 'lucide-react';

const AllInterns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIntern, setNewIntern] = useState({
    name: '',
    stage: 1,
    attendance: 0,
    tasks: 0,
    streak: 0,
    status: '绿'
  });

  const fetchInterns = () => {
    setLoading(true);
    fetch('http://localhost:5001/api/interns')
      .then(res => res.json())
      .then(data => {
        setInterns(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching interns:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBadge = (stage) => {
    if (stage === 1) return 'Explorer';
    if (stage === 2) return 'Practitioner';
    return 'Allied';
  };

  const handleCreateIntern = (e) => {
    e.preventDefault();
    const internData = {
      ...newIntern,
      initials: getInitials(newIntern.name),
      badge: getBadge(parseInt(newIntern.stage))
    };

    fetch('http://localhost:5001/api/interns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(internData)
    })
      .then(res => res.json())
      .then(() => {
        setIsModalOpen(false);
        setNewIntern({ name: '', stage: 1, attendance: 0, tasks: 0, streak: 0, status: '绿' });
        fetchInterns();
      })
      .catch(err => console.error('Error creating intern:', err));
  };

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input 
            type="text" 
            placeholder="Search interns by name..." 
            className="form-input" 
            style={{ paddingLeft: '32px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Intern</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create New Intern</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateIntern}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  value={newIntern.name}
                  onChange={e => setNewIntern({...newIntern, name: e.target.value})}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Stage</label>
                  <select 
                    className="form-input" 
                    value={newIntern.stage}
                    onChange={e => setNewIntern({...newIntern, stage: parseInt(e.target.value)})}
                  >
                    <option value={1}>Stage 1</option>
                    <option value={2}>Stage 2</option>
                    <option value={3}>Stage 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-input" 
                    value={newIntern.status}
                    onChange={e => setNewIntern({...newIntern, status: e.target.value})}
                  >
                    <option value="绿">Active (Green)</option>
                    <option value="黄">Warning (Amber)</option>
                    <option value="红">At Risk (Red)</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div className="form-group">
                  <label className="form-label">Attendance %</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newIntern.attendance}
                    onChange={e => setNewIntern({...newIntern, attendance: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tasks</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newIntern.tasks}
                    onChange={e => setNewIntern({...newIntern, tasks: parseInt(e.target.value)})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Streak</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newIntern.streak}
                    onChange={e => setNewIntern({...newIntern, streak: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Create Profile</button>
            </form>
          </div>
        </div>
      )}
      <div className="data-table-wrapper" style={{ padding: '0' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Stage & Badge</th>
              <th>Attendance</th>
              <th>Tasks Done</th>
              <th>Streak</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Loading interns...</td></tr>
            ) : interns.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No interns found.</td></tr>
            ) : interns.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map(intern => (
              <tr key={intern.id}>
                <td>
                  <div className={`status-dot ${intern.status === '绿' ? 'dot-green' : intern.status === '红' ? 'dot-red' : 'dot-amber'}`}></div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="intern-avatar" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>{intern.initials}</div>
                    <span style={{ fontWeight: 500 }}>{intern.name}</span>
                  </div>
                </td>
                <td>
                  <span className={`stage-badge ${intern.stage === 1 ? 's1' : intern.stage === 2 ? 's2' : 's3'}`}>
                    Stage {intern.stage} · {intern.badge}
                  </span>
                </td>
                <td>{intern.attendance}%</td>
                <td>{intern.tasks}</td>
                <td>{intern.streak} days</td>
                <td>
                  <Link to={`/interns/${intern.id}`} className="btn-primary" style={{ padding: '4px 10px', fontSize: '11px', textDecoration: 'none' }}>
                    Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllInterns;
