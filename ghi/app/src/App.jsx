import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import HatsList from "./HatsList";
import HatForm from "./HatForm";
import Nav from "./Nav";
import ShoeList from "./ShoeList";
import ShoeForm from "./ShoeForm";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/shoes" element={<ShoeList />} />
					<Route path="/shoes/new" element={<ShoeForm />} />
					<Route path="/hats" element={<HatsList />} />
					<Route path="/hats/new" element={<HatForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
