// src/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required');
    } else {
      setError('');

      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify({ email, password })
        })

        const data = await response.json();

        console.log(data);

        if (response.ok) {
          console.log("Login sucessful");
          navigate("/dashboard");
        }
        else {
          console.error("Error:", data.error);
        }
        // response.then((res) => {
        //   if (res.status === 200) {
        //     alert(`Logged in with ${email}`);
        //     navigator.push("/dashboard");
        //   }
        // })
      }
      catch (err) {
        setError('Invalid credentials' + err)
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg bg-white">
        <div className="flex flex-col items-center w-full sm:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Login</h2>
          <form onSubmit={handleSubmit} method="GET" className="space-y-6 w-full">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Don&apos;t have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>
        </div>

        <div className="hidden sm:block w-4/5 bg-gray-300 bg-cover bg-center rounded-r-lg" style={{ backgroundImage: 'url(https://nsysgroup.com/media/lwaogmkz/cover-63.webp)' }}></div>
      </div>
    </div>
  );
};

export default LoginPage;
