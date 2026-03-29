import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px', border: '1px solid var(--border)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="logo-text" style={{ fontSize: '24px' }}>SparcTrack</div>
          <div className="logo-sub" style={{ fontSize: '13px', marginTop: '4px' }}>BrandSparc · Batch 01</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="admin@brandsparc.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '14px' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text3)', textAlign: 'center', lineHeight: '1.6' }}>
          Demo Credentials:<br/>
          <strong>Admin:</strong> admin@brandsparc.com<br/>
          <strong>Batch Lead:</strong> lead@brandsparc.com<br/>
          <strong>Intern:</strong> intern@brandsparc.com<br/>
          <span style={{ fontSize: '11px', opacity: 0.8 }}>(Any password works)</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
