import { ContentWrapper } from "./components/ContentWrapper";
import Account from "./views/AccountView";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Auth from "./views/AuthView";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./views/HomeView";
import { DetailedBookView } from "./views/DetailedBookView";
import { MyBookRatingsView } from "./views/MyBookRatingsView";
import { pb } from "./utils/pocketBaseUtils";

function App() {
  const user = pb.authStore.record;

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
          element: <HomeView session={user} />,
        },
        {
          path: "/profil",
          element: user ? <Account session={user} /> : <Auth />,
        },
        {
          path: "detaljer/:id",
          element: <DetailedBookView session={user} />,
        },
        {
          path: "/mine-ratinger",
          element: <MyBookRatingsView session={user} />,
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
