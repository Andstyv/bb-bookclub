import { ContentWrapper } from "./components/ContentWrapper";
import { useGetSession } from "./hooks/useGetSession";
import Account from "./components/Account";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Auth from "./Auth";
import { Navbar } from "./components/Navbar";
import { LoggedInHomeView } from "./components/LoggedInHomeView";
import { BookDetails } from "./components/BookDetails";

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
          element: session ? <BookDetails /> : <Auth />,
        },
        {
          path: "/profil",
          element: session ? <Account session={session ?? undefined} /> : <Auth />,
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
