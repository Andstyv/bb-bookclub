import { ContentWrapper } from "./components/ContentWrapper";
import { useGetSession } from "./hooks/useGetSession";
import Account from "./components/Account";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Auth from "./Auth";
import { Navbar } from "./components/Navbar";
import { BookDetails } from "./components/BookDetails";
import { HomeView } from "./views/HomeView";
import { BookRatings } from "./views/BookRatings";

function App() {
  const { session } = useGetSession();

  const AppLayout = () => {
    return (
      <>
        <Navbar session={session ?? undefined} />
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
          element: session ? <Account session={session ?? undefined} /> : <Auth />,
        },
        {
          path: "/detaljer",
          element: <BookDetails session={session ?? undefined} />,
        },
        {
          path: "/ratinger",
          element: <BookRatings />,
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
