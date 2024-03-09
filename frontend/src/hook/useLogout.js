import { useAuthContext } from "./useAuthContext.js";
import { useBlogContext } from "./useBlogContext.js";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: blogDispatch } = useBlogContext();

    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem("user");
        // Dispatch logout actions
        authDispatch({ type: "LOGOUT" });
        blogDispatch({ type: "SET_BLOG", payload: null });
    };

    return { logout };
};
