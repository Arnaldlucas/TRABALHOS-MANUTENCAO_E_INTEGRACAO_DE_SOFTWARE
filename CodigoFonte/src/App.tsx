import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

// Componente para exibir enquanto uma página "lazy" é carregada
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader className="animate-spin text-blue-600" size={40} />
  </div>
);

// Importe as páginas. O TS vai inferir os tipos.
const DashBoard = lazy(() => import("./pages/DashBoard"));
const Termos = lazy(() => import("./pages/Termos"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Login = lazy(() => import("./pages/Login"));
const Progresso = lazy(() => import("./pages/Progresso"));
const Layout = lazy(() => import("./components/Layout"));
const Register = lazy(() => import("./pages/Register"));
const Perfil = lazy(() => import("./pages/Perfil"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas internas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progresso" element={<Progresso />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;