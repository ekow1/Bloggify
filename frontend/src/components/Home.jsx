import { useAuthContext } from "../hook/useAuthContext.js";
import BlogHome from "./BlogHome.jsx";
import BlogPage from "./BlogPage.jsx";

const Home = () => {
    const { user } = useAuthContext();

    return (
        // Using a conditional (ternary) operator to render either BlogHome or BlogPage
        user ? <BlogHome /> : <BlogPage />
    );
}

export default Home;
