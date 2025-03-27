import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton, Tooltip
} from "@mui/material";
import Link from "next/link";
import { KeyboardArrowDown, ChevronRight } from '@mui/icons-material';


type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  children?: NavGroup[];
  disabled?: boolean;
  external?: boolean;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (item.children) {
      setOpen(!open);
    }
    onClick && onClick(event);
  };

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    width: '100%',
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "6px 10px",
      // borderRadius: "6px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      width: '100%',
      "& .MuiListItemText-root": {
        minWidth: 0,
        "& span": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
        }
      },
      "&:hover": {
        backgroundColor: "#3A3F50",
        color: theme.palette.primary.light,
        // borderRadius: "6px",
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#3A3F50",
        // borderRadius: "6px",
        "&:hover": {
          backgroundColor: "#3A3F50",
          color: "white",
          // borderRadius: "6px",
        },
      },
    },
    "& .MuiListSubheader-root": {
      backgroundColor: "transparent",
      color: "white !important",
      "&.MuiListSubheader-gutters": {
        color: "white !important",
      },
    },
  }));

  return (
    <List 
      component="div" 
      disablePadding 
      key={item.id}
      sx={{
        '& .MuiListSubheader-root': {
          backgroundColor: "transparent",
          color: "white !important",
          '&.MuiListSubheader-gutters': {
            color: "white !important",
          },
        },
      }}
    >
      <ListItemStyled>
        <Tooltip title={item.title} placement="right">
          <ListItemButton
            component={item.children ? 'div' : Link}
            href={item.children ? undefined : item.href}
            disabled={item.disabled}
            selected={pathDirect === item.href}
            target={item.external ? "_blank" : ""}
            onClick={handleClick}
          >
            <ListItemIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color: "inherit",
              }}
            >
              {itemIcon}
            </ListItemIcon>

            <ListItemText>
              <>{item.title} </>
            </ListItemText>


            {item.children && (
              <span style={{ marginLeft: 'auto', flexShrink: 0 }}>
                {open ? <KeyboardArrowDown sx={{ fontSize: 20 }} /> : <ChevronRight sx={{ fontSize: 20 }} />}
              </span>
            )}
          </ListItemButton>
        </Tooltip>
      </ListItemStyled>

      {item.children && (
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            maxHeight: open ? '1000px' : 0,
            overflow: 'hidden',
            transition: theme.transitions.create(['max-height'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter
            }),
            pl: 4,
            '& .MuiListItemButton-root': {
              transition: 'none',
              outline: '2px dotted transparent',
            }
          }}
        >
          {item.children.map((child: NavGroup) => (
            <ListItemStyled key={child.id}>
              <Tooltip title={child.title} placement="right">
                <ListItemButton
                  component={Link}
                  href={child.href}
                  selected={pathDirect === child.href}
                  onClick={onClick}
                  sx={{
                    pl: 4,
                    py: 1
                  }}
                >

                  <ListItemText primary={child.title} />

                </ListItemButton>
              </Tooltip>
            </ListItemStyled>
          ))}
        </List>
      )}
    </List>
  );
};

export default NavItem;
