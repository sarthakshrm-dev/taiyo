import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    const isActivePath = location.pathname === path;
    const isActiveSubpath = location.pathname.startsWith(`${path}/`);
    return isActivePath || isActiveSubpath ? "bg-gray-700" : "";
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-1/5 p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={`block p-2 rounded hover:bg-gray-700 ${isActive(
                "/"
              )}`}
            >
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/charts-and-maps"
              className={`block p-2 rounded hover:bg-gray-700 ${isActive(
                "/charts-and-maps"
              )}`}
            >
              Charts And Maps
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
