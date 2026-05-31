"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login successful', response.data);
      router.push('/profile');
    } catch(error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      console.log('Error: ', message);
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled = !user.email || !user.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-400">
          {loading ? 'Logging In' : 'Login'}
        </h1>

        <div className="flex flex-col gap-2">
        
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mt-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mt-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-4 hover:bg-blue-700 transition duration-200"
            onClick={onLogin}
            disabled={buttonDisabled}
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an Account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
