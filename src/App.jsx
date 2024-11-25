import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './auth/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ModeToggle } from './components/mode-toggle';


function App() {


    return (
		<BrowserRouter>
			<div className='absolute bottom-5 right-5'>
				<ModeToggle/>
			</div>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={< HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App
