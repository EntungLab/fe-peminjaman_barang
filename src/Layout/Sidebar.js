import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/items', label: 'Daftar Barang' },
    { path: '/loans', label: 'Peminjaman' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-md">
      <div className="p-4">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;