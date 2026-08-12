// ====== Imports ======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { PartnerProfile } from "../pages/PartnerProfile";
import { AdminNavbar } from "../components/AdminNavbar";
import { AdminLinks } from "../pages/AdminLinks";
import { AdminUsers } from "../pages/AdminUsers";
import { AdminLeads } from "../pages/AdminLeads";
import { Login } from "../pages/Login";

// ====== definicao das rotas por meio de func ======
export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<>
                <AdminNavbar />
                <Dashboard />
                </>
                } />
                <Route path="/admin/links" element={
                    <>
                    <AdminNavbar />
                    <AdminLinks />
                    </>
                } />
                <Route path="/admin/usuarios" element={
                    <>
                    <AdminNavbar />
                    <AdminUsers />
                    </>
                } />
                <Route path="/admin/leads" element={
                    <>
                    <AdminNavbar />
                    <AdminLeads />
                    </>
                } />
                <Route path="/partner" element={<PartnerProfile />} />
            </Routes>
        </BrowserRouter>
    );
}