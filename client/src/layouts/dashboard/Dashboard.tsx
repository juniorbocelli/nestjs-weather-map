import * as React from 'react';
import {
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
// components
import { BackDrop } from 'src/components/back-drop';
import { AlertDialog } from 'src/components/alert-dialog';
// contexts
import { useAuth } from 'src/auth/context';
//
import Strings from 'src/shared/strings';
import * as Paths from 'src/routes/paths';
// internal components
import Navigator from './components/Navigator';
import Header from './components/Header';
import Footer from './components/Footer';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from './types';

const drawerWidth = 256;

interface IDashboardProps {
  title: string;
  activeMenu: string;

  pageTitle?: string;

  children?: React.ReactNode;

  fatherStates?: {
    isQueryingAPI?: IsQueryingAPIState;

    dialogMessage?: DialogMessageState;
    setDialogMessage?: React.Dispatch<React.SetStateAction<DialogMessageState>>;
  };

  // permissions
  exludeList?: number[];
};

const Dashboard: React.FC<IDashboardProps> = ({ children, fatherStates, title, activeMenu, pageTitle, exludeList }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const auth = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Effects
  React.useEffect(() => {
    if (typeof (pageTitle) !== 'undefined')
      document.title = `${Strings.Page.PAGE_TITLE_COMPANY_NAME}${Strings.Page.PAGE_TITLE_SEPARATOR}${pageTitle}`;
    else
      document.title = `${Strings.Page.PAGE_TITLE_COMPANY_NAME}`;
  }, [pageTitle]);

  // Redirect to Dashboard when use have not permission
  React.useEffect(() => {
    if (typeof exludeList !== "undefined")
      if (auth.loggedUser)
        if (exludeList.indexOf(auth.loggedUser.type as number) !== -1)
          navigate(Paths.PATH_DASHBOARD.home)
  }, [auth.loggedUser, navigate, exludeList]);

  // Memos
  const Feedbacks = React.useMemo(() => {
    const _onClose = () => {
      if (typeof (fatherStates?.setDialogMessage) !== "undefined")
        fatherStates.setDialogMessage(undefined);
    };

    return (
      <>
        {
          typeof (fatherStates) !== 'undefined' && typeof (fatherStates.isQueryingAPI) !== 'undefined' ?
            <BackDrop open={fatherStates.isQueryingAPI} />
            :
            null
        }

        {
          typeof (fatherStates) !== 'undefined' && typeof (fatherStates.dialogMessage) !== 'undefined' ?
            <AlertDialog
              title={fatherStates.dialogMessage.title}
              content={fatherStates.dialogMessage.message}
              open={typeof (fatherStates.dialogMessage) !== 'undefined'}
              onClose={_onClose}
            />
            : null
        }
      </>
    )
  }, [fatherStates]);

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
          {Feedbacks}

          {children}

        </Box>

        <Footer />

      </Box>
    </Box>
  );
};

export default Dashboard;