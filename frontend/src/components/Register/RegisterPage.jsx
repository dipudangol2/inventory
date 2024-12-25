// src/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userName, email, password })
        });
        // console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          console.log("Registration successful");
          navigate("/login");
        }
        else {
          console.error("Error:", data.error);
          setError(data.error);
        }
      }
      // alert(`Registered with ${email}`);

      catch (err) {
        setError("Registration failed:" + err);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg bg-white">
        {/* Left Section - Register Form */}
        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your username"
              />
            </div>
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
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Confirm your password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>

        {/* Right Section - Image Placeholder */}
        <div className="hidden sm:block w-4/5 bg-gray-300 bg-cover bg-center rounded-r-lg" style={{ backgroundImage: 'url(https://nsysgroup.com/media/lwaogmkz/cover-63.webp)' }}></div>
      </div>
    </div>
  );
};

export default RegisterPage;
