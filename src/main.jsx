import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster, toast } from "sonner";
import { ThemeProvider } from './components/theme-provider'

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<App />
			<Toaster richColors position="bottom-right" />
		</ThemeProvider>
	</StrictMode>
);
