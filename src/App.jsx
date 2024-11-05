import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './auth/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { ModeToggle } from './components/mode-toggle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {

	const isLoggedIn = Cookies.get('token');

    return (
		<BrowserRouter>
			<div className="absolute  top-5 left-5">
				{" "}
				<ModeToggle />
			</div>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
					<Route path="/" element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App
