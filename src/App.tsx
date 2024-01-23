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
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const { session } = useGetSession();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    console.log("using avatarget");
    const fetchAvatarImg = async () => {
      console.log("using fetch avatar");
      if (session) {
        const { data } = await supabase.from("profiles").select("avatar_url").eq("id", session?.user.id);
        if (data) {
          setAvatar(data[0].avatar_url);
        }
      }
    };
    fetchAvatarImg();
  }, [session]);

  const AppLayout = () => {
    return (
      <>
        <Navbar session={session ?? undefined} avatar={avatar ?? null} />
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
