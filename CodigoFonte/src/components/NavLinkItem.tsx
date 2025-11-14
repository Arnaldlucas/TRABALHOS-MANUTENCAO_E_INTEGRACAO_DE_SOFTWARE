import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react'; // Importe o tipo do ícone
import React from 'react'; // Importe React

// 1. Defina a interface para as props
interface NavLinkItemProps {
  to: string;
  icon: LucideIcon; // O ícone é do tipo LucideIcon
  children: React.ReactNode;
}

export default function NavLinkItem({ to, icon: Icon, children }: NavLinkItemProps) {
  const activeClassName = "text-blue-600 font-semibold";
  const inactiveClassName = "text-gray-700 hover:text-blue-600";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center gap-1 transition-colors ${isActive ? activeClassName : inactiveClassName}`
      }
    >
      {Icon && <Icon size={16} />}
      {children}
    </NavLink>
  );
}