import * as React from 'react';
import {
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../../../features/navigation/Navigator';
import Header from '../../../../features/navigation/Header';
import Footer from './components/Footer';

import Container from './components/Container';
import ContainerWithAppBar from './components/ContainerWithAppBar';
import Title from './components/Title';

import BackDrop from '../../../../ui/components/BackDrop';
import AlertDialog from '../../../../ui/components/AlertDialog';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from './types';
import { useAuth } from '../../../../features/auth/context';

import * as Strings from '../../../../globals/strings';
import * as Routes from '../../../../globals/routes';

const drawerWidth = 256;

interface IMainPageProps {
  title: string;
  activeMenu: string;

  pageTitle?: string;

  children?: React.ReactNode;

  fatherStates?: {
    isQueryingAPI?: IsQueryingAPIState;

    dialogMessage?: DialogMessageState;
    setDialogMessage?: React.Dispatch<React.SetStateAction<DialogMessageState>>;
  };

  exludeList?: number[];
};

const MainPage: React.FC<IMainPageProps> = ({ children, fatherStates, title, activeMenu, pageTitle, exludeList }) => {
  const theme = useTheme();
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const _onClose = () => {
    if (typeof (fatherStates?.setDialogMessage) !== "undefined")
      fatherStates.setDialogMessage(undefined);
  };

  // Effects
  React.useEffect(() => {
    if (typeof (pageTitle) !== 'undefined')
      document.title = `${Strings.PAGE_TITLE_COMPANY_NAME}${Strings.PAGE_TITLE_SEPARATOR}${pageTitle}`;
    else
      document.title = `${Strings.PAGE_TITLE_COMPANY_NAME}`;
  }, [pageTitle]);

  React.useEffect(() => {
    if (typeof exludeList !== "undefined")
      if (auth.loggedUser)
        if (exludeList.indexOf(auth.loggedUser.type) !== -1)
          navigate(Routes.SCREEN_DASHBOARD)
  }, [auth.loggedUser]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isSmUp ? null : (
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}

            activeMenu={activeMenu}
          />
        )}
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { sm: 'block', xs: 'none' } }}

          activeMenu={activeMenu}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` } }}>
        <Header onDrawerToggle={handleDrawerToggle} title={title} />
        <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
          {
            typeof (fatherStates) !== 'undefined' ? typeof (fatherStates.isQueryingAPI) !== 'undefined' ?
              <BackDrop open={fatherStates.isQueryingAPI} /> : null : null
          }

          {
            typeof (fatherStates) !== 'undefined' ? typeof (fatherStates.dialogMessage) !== 'undefined' ?
              <AlertDialog
                title={fatherStates.dialogMessage.title}
                content={fatherStates.dialogMessage.message}
                open={typeof (fatherStates.dialogMessage) !== 'undefined'}
                onClose={_onClose}
              />
              : null : null
          }

          {children}

        </Box>

        <Footer />

      </Box>
    </Box>
  );
};

export { Container, ContainerWithAppBar, Title };

export default MainPage;