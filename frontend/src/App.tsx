import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ContractsPage from "./features/contracts/pages/ContractsPage";
import SuppliersPage from "./features/suppliers/pages/SuppliersPage";

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    path="/"
                    element={<Navigate to="/contracts" replace />}
                />
                <Route
                    path="/contracts"
                    element={<ContractsPage />}
                />
                <Route
                    path="/suppliers"
                    element={<SuppliersPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
