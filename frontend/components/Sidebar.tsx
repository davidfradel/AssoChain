'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaAddressBook, FaFileInvoiceDollar, FaProjectDiagram, FaWallet, FaRunning, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isContactsOpen, setContactsOpen] = useState(true);

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
        { name: 'Liste des adhérents', path: '/contacts/members' },
        { name: 'Adhésions', path: '/contacts/memberships' },
      ],
    },
    { name: 'Facture et devis', path: '/invoices', icon: <FaFileInvoiceDollar /> },
    { name: 'Projets documentaires', path: '/projects', icon: <FaProjectDiagram /> },
    { name: 'Organisation sportive', path: '/sports-organization', icon: <FaRunning /> },
    { name: 'Wallets', path: '/wallets', icon: <FaWallet /> },
  ];

  const handleToggleContacts = (event: React.MouseEvent) => {
    event.preventDefault();
    setContactsOpen(!isContactsOpen);
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
                    <span className="w-full cursor-pointer" onClick={handleToggleContacts}>
                      {item.name}
                    </span>
                    <button onClick={handleToggleContacts} className="ml-auto">
                      {isContactsOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </button>
                  </>
                ) : (
                  <Link className="w-full" href={item.path}>
                    {item.name}
                  </Link>
                )}
              </div>
              {isContactsOpen && item.subItems && (
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
