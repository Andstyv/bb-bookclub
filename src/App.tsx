import { ContentWrapper } from "./components/ContentWrapper";
import { useGetSession } from "./hooks/useGetSession";
import Account from "./components/Account";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Auth from "./Auth";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./views/HomeView";
import { BookRatings } from "./views/BookRatings";
import { BookDetails } from "./views/BookDetails";
import { useGetUser } from "./hooks/useGetUser";

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
          element: <HomeView />,
        },
        {
          path: "/profil",
          element: session && !loadingSession ? <Account session={session ?? undefined} /> : <Auth />,
        },
        {
          path: "/detaljer",
          element: <BookDetails session={session ?? undefined} />,
        },
        {
          path: "/ratinger",
          element: <BookRatings session={session ?? undefined} loadingSession={loadingSession} />,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="App bg-[#272736]">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
