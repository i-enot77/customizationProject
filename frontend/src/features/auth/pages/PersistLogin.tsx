// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Outlet, useNavigate } from "react-router-dom";
// import { RootState } from "../../../services/store";
// import { useRefreshMutation } from "../../../services/authApi";

// const PersistLogin = () => {
//   const navigate = useNavigate();
//   const persist = useSelector((state: RootState) => state.auth.persist);
//   const auth = useSelector((state: RootState) => state.auth.auth);
//   const [refresh, { error }] = useRefreshMutation();

//   useEffect(() => {
//     if (!persist) return;

//     if (error || !auth || !auth.accessToken) {
//       console.error("Error refreshing token");
//       navigate("/login");
//       return;
//     }

//     const handleRefresh = async () => {
//       try {
//         await refresh();
//       } catch (error) {
//         console.error("Error refreshing token", error);
//         navigate("/login");
//       }
//     };

//     handleRefresh();
//   }, [navigate, persist, auth, error, refresh]);

//   return <Outlet />;
// };

// export default PersistLogin;
