import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth?.status ?? false);

  const navItems = [
    { name: "Home", slug: "/", show: true },
    { name: "Login", slug: "/login", show: !authStatus },
    { name: "Signup", slug: "/signup", show: !authStatus },
    { name: "All Posts", slug: "/all-posts", show: authStatus },
    { name: "Add Post", slug: "/add-post", show: authStatus },
  ];

  const baseClasses =
    "inline-block px-6 py-2 rounded-full transition duration-200";

  const activeClasses = "bg-blue-600 text-white";

  const inactiveClasses = "text-black hover:bg-blue-100";

  return (
    <header className="sticky top-0 z-50 border-b shadow-sm bg-white/80 backdrop-blur border-black/5">
      <Container>
        <nav className="flex items-center h-16">
          {/* Logo  */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <Logo width="60px" />
            </Link>
          </div>
          {/* Navigation  */}
          <ul className="flex items-center gap-2 ml-auto">
            {navItems.map(
              (item) =>
                item.show && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      end={item.slug === "/"}
                      className={({ isActive }) =>
                        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ),
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
