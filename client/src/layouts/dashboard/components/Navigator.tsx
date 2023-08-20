import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import ContactsIcon from '@mui/icons-material/Contacts';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/auth/context';
import * as Paths from 'src/routes/paths';

type Category = {
  id: string;
  // user permissions
  exclude: number[];
  // sub-menus
  children: {
    id: string;
    icon: React.ReactNode;
    // to hightlight menu
    menuName: string;
    url: string;
  }[];
};

const categories: Category[] = [
  // {
  //   id: 'Usuários',
  //   exclude: [2, 3],
  //   children: [
  //     {
  //       id: 'Lista de Usuários',
  //       icon: <PeopleIcon />,
  //       menuName: 'userList',
  //       url: Paths.SCREEN_USER_SELECT_ALL,
  //     },
  //     {
  //       id: 'Gerenciar Usuários',
  //       icon: <EditIcon />,
  //       menuName: 'userManager',
  //       url: Paths.SCREEN_USER_CREATE,
  //     },
  //   ],
  // },
  // {

];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

interface INavigatorProps extends DrawerProps {
  activeMenu: string;
};

export default function Navigator(props: INavigatorProps) {
  const { activeMenu, ...other } = props;
  const navigate = useNavigate();
  const auth = useAuth();

  const Submenus = React.useMemo(() => (
    <>
      {
        categories.map(({ id, exclude, children }) => (
          auth.loggedUser && exclude.indexOf(auth.loggedUser.type) === -1 ?
            <Box key={id} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, menuName, url }) => (
                <ListItem disablePadding key={`${id}-${childId}`}>
                  <ListItemButton
                    selected={menuName === activeMenu}
                    onClick={() => navigate(url || '#')}
                    disabled={url === '#' && menuName !== activeMenu}

                    sx={item}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
            : null
        ))
      }
    </>
  ), [activeMenu, auth.loggedUser, navigate]);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 20, color: '#fff' }}>
          Relatórios Gerenciais
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory, cursor: 'pointer' }} selected={activeMenu === 'dashboard'} onClick={() => navigate(Paths.PATH_DASHBOARD.home)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        {Submenus}
      </List>
    </Drawer>
  );
};