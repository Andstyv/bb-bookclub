import { ContentWrapper } from "./components/ContentWrapper";
import { useGetSession } from "./hooks/useGetSession";
import Account from "./views/AccountView";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Auth from "./views/AuthView";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./views/HomeView";
import { useGetUser } from "./hooks/useGetUser";
import { DetailedBookView } from "./views/DetailedBookView";
import { MyBookRatingsView } from "./views/MyBookRatingsView";

function App() {
  const { session, loadingSession } = useGetSession();
  const { userData } = useGetUser({ session });

  const AppLayout = () => {
    return (
      <>
        <Navbar session={session ?? undefined} avatar={userData?.avatar_url || undefined} />
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
          element: <HomeView session={session} />,
        },
        {
          path: "/profil",
          element: session && !loadingSession ? <Account session={session ?? undefined} /> : <Auth />,
        },
        {
          path: "detaljer/:id",
          element: <DetailedBookView session={session ?? undefined} />,
        },
        {
          path: "/mine-ratinger",
          element: <MyBookRatingsView session={session ?? undefined} loadingSession={loadingSession} />,
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
