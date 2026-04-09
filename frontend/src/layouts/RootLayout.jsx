import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/products">Products</Link>

      </nav>

      <main>
        <Outlet />
      </main>

      <footer>Mon Footer partagé</footer>
    </div>
  );
}
