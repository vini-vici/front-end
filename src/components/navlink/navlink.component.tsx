import React from 'react';
import { NavLink as BaseNavLink, NavLinkProps as BaseNavLinkProps } from 'react-router-dom';


export interface NavLinkProps extends Omit<BaseNavLinkProps, 'ref'> {
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function NavLink({ activeClassName, activeStyle, ...props }: NavLinkProps) {
  return (
    <BaseNavLink
      {...props}
      className={
        ({ isActive }) => [
          props.className,
          isActive ? activeClassName : null
        ].filter(Boolean).join(' ')
      }
      style={({ isActive }) => ({
        ...props.style,
        ...(isActive ? activeStyle : null)
      })}
    />
  );
}