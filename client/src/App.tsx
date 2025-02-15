import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router';
import './index.css'
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
      </Routes>
    </Router>
  );
};

export default App
