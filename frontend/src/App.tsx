import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ContractsPage from "./features/contracts/pages/ContractsPage";
import ContractDetailsPage from "./features/contracts/pages/ContractDetailsPage";
import SuppliersPage from "./features/suppliers/pages/SuppliersPage";
import SupplierDetailsPage from "./features/suppliers/pages/SupplierDetailsPage";

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
                    path="/contracts/:contractId"
                    element={<ContractDetailsPage />}
                />
                <Route
                    path="/suppliers"
                    element={<SuppliersPage />}
                />
                <Route
                    path="/suppliers/:supplierId"
                    element={<SupplierDetailsPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
