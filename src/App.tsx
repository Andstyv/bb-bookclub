import { ContentWrapper } from "./components/ContentWrapper";
import Account from "./views/AccountView";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Auth from "./views/AuthView";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./views/HomeView";
import { DetailedBookView } from "./views/DetailedBookView";
import { MyBookRatingsView } from "./views/MyBookRatingsView";
import { BooksView } from "./views/BooksView";
import CreateUserView from "./views/CreateUserView";
import { useAuthStore } from "./utils/useAuthStore";

function App() {
  const { user } = useAuthStore();

  const AppLayout = () => {
    return (
      <>
        <Navbar avatar={user?.avatar_url || undefined} />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomeView />,
        },
        {
          path: "/profil",
          element: <Account />,
        },
        {
          path: "detaljer/:id",
          element: <DetailedBookView />,
        },
        {
          path: "/mine-ratinger",
          element: <MyBookRatingsView />,
        },
        {
          path: "/bøker",
          element: <BooksView />,
        },
        {
          path: "/opprett-bruker",
          element: <CreateUserView />,
        },
        {
          path: "/logg-inn",
          element: <Auth />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="App bg-bb_bg font-mono">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
