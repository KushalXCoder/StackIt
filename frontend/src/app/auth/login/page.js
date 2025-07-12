import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="w-screen h-[calc(100vh-96px)] flex justify-center items-center bg-emerald-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-emerald-600 mb-3 font-funnelDisplay">
          Login to StackIt
        </h2>
        <p className='text-center mb-3 font-poppins'>Have some queries, you are at the best place for it !</p>
        <form className="flex flex-col space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 font-funnelDisplay">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 font-poppins text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 font-funnelDisplay">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 font-poppins text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition font-funnelDisplay text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6 font-poppins">
          Don’t have an account?{' '}
          <Link href="#" className="text-emerald-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;