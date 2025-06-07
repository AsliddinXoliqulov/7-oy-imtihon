import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Button } from 'antd';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setError('');
    try {
      const data = await signIn({ email, password });
      login(data);
      navigate('/asosiy');
    } catch (err) {
      setError("Login xato. Email yoki parol noto‘g‘ri.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Tizimga kirish 👋</h2>
        <p className='pb-5 text-center'>Kirish uchun email va parolni kiriting</p>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parol"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
          Kirish
        </Button>
      </form>
    </div>
  );
}
