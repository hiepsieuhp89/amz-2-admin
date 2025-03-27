import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import './style.css'

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;


  return (
      <List sx={{ pt: 0}} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                item={item as any}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
  );
};
export default SidebarItems;
