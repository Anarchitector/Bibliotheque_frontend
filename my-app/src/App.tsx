import Layout from "components/Layout/Layout";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import PageAccessDenied from "pages/PageAccessDenied/PageAccessDenied";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import PagePersonalCabinet from "pages/PagePersonalCabinet/PagePersonalCabinet";
import RegistLoginError from "pages/RegistrLoginError/RegistrLoginError";
import UserRegistr from "pages/UserRegistr/UserRegistr";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "store/store";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute"; // Импортируем ProtectedRoute
import PageUsersList from "pages/PageUsersList/PageUsersList";
import PageBooks from "pages/PageBooks/PageBooks";
import PageLibraryRegistration from "pages/PageLibraryRegistration/PageLibraryRegistration";
import PageLibraryManager from "pages/PageLibraryManager/PageLibraryManager";
import Notifications from "components/Notifications/Notifications";
import Cart from "pages/Cart/Cart";
import PageLibraryEdit from "pages/PageLibraryEdit/PageLibraryEdit";
import PageLibrariesList from "pages/PageLibrariesList/PageLibrariesList";
import SearchPage from "pages/SearchPage/SearchPage";
import { useEffect } from "react";
import { userSliceActions } from "store/redux/userSlice/userSlice";
import PageLibraryOrderedBooks from "pages/PageLibraryOrderedBooks/PageLibraryOrderedBooks";



const App = () => {

  // Эта часть кода отвечает за проверку данных о пользователе
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем наличие данных о пользователе в localStorage или sessionStorage 
    // const storedUser = localStorage.getItem('user');
    const storedUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      // Если данные найдены, восстанавливаем состояние пользователя
      const user = JSON.parse(storedUser);
      dispatch(userSliceActions.setUser(user));
    }
  }, [dispatch]);
  // -------------------- //

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          {/* Контейнер для уведомлений */}
          <Notifications />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/auth/register" element={<UserRegistr />} />
            <Route path="/api/auth/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/api/auth/error" element={<RegistLoginError />} />
            <Route path="/api/libraries/all" element={<PageLibrariesList />} />            

            {/* Защищенные маршруты */}
            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_LIBRARY", "ROLE_ADMIN"]} />}
            >
            <Route path="/api/bibliotek" element={<PageLibraryManager />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_LIBRARY", "ROLE_ADMIN"]} />}
            >
            <Route path="/api/bibliotek/orders" element={<PageLibraryOrderedBooks />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_LIBRARY", "ROLE_ADMIN"]} />}
            >
            <Route path="/api/bibliotek/register" element={<PageLibraryRegistration />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_LIBRARY", "ROLE_ADMIN"]} />}
            >
            <Route path="/api/bibliotek/edit" element={<PageLibraryEdit />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["ROLE_LIBRARY", "ROLE_ADMIN"]} />}
            >
            <Route path="/api/books" element={<PageBooks />} />
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
