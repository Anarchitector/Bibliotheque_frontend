import Layout from "components/Layout/Layout";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import PageAccessDenied from "pages/PageAccessDenied/PageAccessDenied";
import PageLibrary from "pages/PageLibrary/PageLibrary";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import PagePersonalCabinet from "pages/PagePersonalCabinet/PagePersonalCabinet";
import RegistLoginError from "pages/RegistrLoginError/RegistrLoginError";
import UserRegistr from "pages/UserRegistr/UserRegistr";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "store/store";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute"; // Импортируем ProtectedRoute
import PageUsersList from "pages/PageUsersList/PageUsersList";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/auth/register" element={<UserRegistr />} />
            <Route path="/api/auth/login" element={<Login />} />
            <Route path="/api/auth/error" element={<RegistLoginError />} />

            {/* Защищенные маршруты */}
            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_LIBRARY", "ROLE_ADMIN"]} />}
            >
            <Route path="/api/library" element={<PageLibrary />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN", "ROLE_LIBRARY"]} />}
            >
              <Route path="/api/users/:id" element={<PagePersonalCabinet />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}
            >
              <Route path="/users" element={<PageUsersList />} />
            </Route>
            {/* Защищенные маршруты */}

            <Route path="/access-denied" element={<PageAccessDenied />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
