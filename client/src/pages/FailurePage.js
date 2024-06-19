import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed!</h1>
        <p className="text-xl">You will be redirected to the home page in a moment.</p>
      </div>
    </div>
  );
};

export default FailurePage;
