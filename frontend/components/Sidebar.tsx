'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaAddressBook, FaFileInvoiceDollar, FaUserFriends, FaProjectDiagram, FaRunning, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isContactsOpen, setContactsOpen] = useState(false);
  const [isMembershipsOpen, setMembershipsOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', path: '/', icon: <FaHome /> },
    {
      name: 'Contacts',
      path: '/contacts',
      icon: <FaAddressBook />,
      subItems: [
        { name: 'Liste des contacts', path: '/contacts/list' },
        { name: 'Ajouter un contact', path: '/contacts/add' },
        { name: 'Modifier contact', path: '/contacts/edit' },
      ],
    },
    {
      name: 'Adhésions',
      path: '/memberships',
      icon: <FaUserFriends />,
      subItems: [
        { name: 'Liste des adhérents', path: '/memberships/list' },
        { name: 'Ajouter un adhérent', path: '/memberships/add' },
      ],
    },
    { name: 'Facture et devis', path: '/invoices', icon: <FaFileInvoiceDollar /> },
    { name: 'Projets documentaires', path: '/projects', icon: <FaProjectDiagram /> },
    { name: 'Résultats sportifs', path: '/results', icon: <FaRunning /> },
  ];

  useEffect(() => {
    if (pathname.startsWith('/contacts')) {
      setContactsOpen(true);
    }
    if (pathname.startsWith('/memberships')) {
      setMembershipsOpen(true);
    }
  }, [pathname]);

  const handleToggleContacts = (event: React.MouseEvent) => {
    event.preventDefault();
    setContactsOpen(!isContactsOpen);
  };

  const handleToggleMemberships = (event: React.MouseEvent) => {
    event.preventDefault();
    setMembershipsOpen(!isMembershipsOpen);
  };

  return (
    <aside className="w-80 bg-gray-800 text-white min-h-screen p-4">
      <nav>
        <ul className="p-4 space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <div className={`flex items-center space-x-2 p-2 rounded ${pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                {item.icon}
                {item.subItems ? (
                  <>
                    <span className="w-full cursor-pointer" onClick={item.name === 'Contacts' ? handleToggleContacts : handleToggleMemberships}>
                      {item.name}
                    </span>
                    <button onClick={item.name === 'Contacts' ? handleToggleContacts : handleToggleMemberships} className="ml-auto">
                      {item.name === 'Contacts' ? (isContactsOpen ? <FaChevronDown /> : <FaChevronRight />) : (isMembershipsOpen ? <FaChevronDown /> : <FaChevronRight />)}
                    </button>
                  </>
                ) : (
                  <Link className="w-full" href={item.path}>
                    {item.name}
                  </Link>
                )}
              </div>
              {item.name === 'Contacts' && isContactsOpen && item.subItems && (
                <ul className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path} className={`flex items-center space-x-2 p-2 rounded ${pathname === subItem.path ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                      <Link className="w-full" href={subItem.path}>
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {item.name === 'Adhésions' && isMembershipsOpen && item.subItems && (
                <ul className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path} className={`flex items-center space-x-2 p-2 rounded ${pathname === subItem.path ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                      <Link className="w-full" href={subItem.path}>
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
