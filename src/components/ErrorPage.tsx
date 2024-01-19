import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center mt-20">
      <h1>Reeeee!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
      </p>
    </div>
  );
};
