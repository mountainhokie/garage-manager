import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavigationBar from './components/NavigationBar';
import Loading from './components/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.scss';

const Home = lazy(() => import('./pages/Home'));
const Vehicles = lazy(() => import('./pages/Vehicles'));
const AddVehicle = lazy(() => import('./pages/AddVehicle'));
const Vehicle = lazy(() => import('./pages/Vehicle'));
const BuyIt = lazy(() => import('./pages/BuyIt'));
const PartsList = lazy(() => import('./pages/PartsList'));
const AddPart = lazy(() => import('./pages/AddPart'));
const Part = lazy(() => import('./pages/Part'));
const BuildCalculator = lazy(() => import('./pages/BuildCalculator'));
const Inspection = lazy(() => import('./pages/Inspection'));

function App() {
	return (
		<BrowserRouter>
			<div className="wrapper">
				<NavigationBar />
				<div className="main-container">
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/vehicles" element={<Vehicles />} />
							<Route path="/addvehicle" element={<AddVehicle />} />
							<Route path={`${process.env.PUBLIC_URL}/vehicle/:vehicleID`} element={<Vehicle />} />
							<Route path="/buyit" element={<BuyIt />} />
							<Route path="/partslist" element={<PartsList />} />
							<Route path="/addpart" element={<AddPart />} />
							<Route path={`${process.env.PUBLIC_URL}/part/:partID`} element={<Part />} />
							<Route path="/buildcalculator" element={<BuildCalculator />} />
							<Route path="/inspection" element={<Inspection />} />
						</Routes>
					</Suspense>
				</div>
			</div>
			<Toaster
				position="bottom-right"
				toastOptions={{
					duration: 5000,
					style: {
						fontSize: "1.4rem",
					},
				}}
			/>
		</BrowserRouter>
	);
}

export default App;