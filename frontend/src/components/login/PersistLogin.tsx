import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRefreshMutation } from "../../services/authApi";
import { useAppSelector } from "../../services/hooks";

const PersistLogin = () => {
  const navigate = useNavigate();
  const persist = useAppSelector((state) => state.auth.persist);
  const auth = useAppSelector((state) => state.auth.auth);
  const [refresh, { error }] = useRefreshMutation();

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error("Error refreshing token", error);
        navigate("/login");
      }
    };

    if (persist) {
      if (error || !auth) {
        console.error("Error refreshing token");
        navigate("/login");
      } else if (auth) {
        auth.accessToken ? handleRefresh() : navigate("/login");
      }
    }
  }, [navigate, persist, auth, error, refresh]);

  return <Outlet />;
};

export default PersistLogin;
