import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ContractsPage from "./features/contracts/pages/ContractsPage";
import ContractDetailsPage from "./features/contracts/pages/ContractDetailsPage";
import SuppliersPage from "./features/suppliers/pages/SuppliersPage";
import SupplierDetailsPage from "./features/suppliers/pages/SupplierDetailsPage";
import CatalogItemsPage from "./features/catalogItems/pages/CatalogItemsPage";
import CatalogItemDetailsPage from "./features/catalogItems/pages/CatalogItemDetailsPage";
import CreateCatalogItemPage from "./features/catalogItems/pages/CreateCatalogItemPage";
import CreateContractPage from "./features/contracts/pages/CreateContractPage";
import CreateSupplierPage from "./features/suppliers/pages/CreateSupplierPage";

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
                    path="/contracts/new"
                    element={<CreateContractPage />}
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
                <Route path="suppliers/new" element={<CreateSupplierPage />} />
                <Route
                    path="/catalogitems"
                    element={<CatalogItemsPage />}
                />
                <Route
                    path="/catalogitems/new"
                    element={<CreateCatalogItemPage />}
                />
                <Route
                    path="/catalogitems/:catalogItemId"
                    element={<CatalogItemDetailsPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
