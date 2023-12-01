import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
