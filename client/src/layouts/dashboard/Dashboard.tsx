import * as React from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
  CssBaseline,
} from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';

// components
import { BackDrop } from 'src/components/back-drop';
import { AlertDialog } from 'src/components/modal-dialog';
// contexts
import { useAuthContext } from 'src/auth/context';
import { useFeedbackContext } from 'src/hooks/feedbacks';
//
import Strings from 'src/shared/strings';
import * as Paths from 'src/routes/paths';
// internal components
import Navigator from './components/Navigator';
import Header from './components/Header';
import Footer from './components/Footer';

// ----------------------------------------------------------------------

const drawerWidth = 256;

interface IDashboardProps {
  title: string;
  activeMenu: string;

  pageTitle?: string;

  // permissions
  exludeList?: number[];
};

// ----------------------------------------------------------------------

const Dashboard: React.FC<IDashboardProps> = ({ title, activeMenu, pageTitle, exludeList }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const auth = useAuthContext();
  const { states: fatherStates } = useFeedbackContext();

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
          navigate(Paths.PATH_DASHBOARD.home);
  }, [auth.loggedUser, navigate, exludeList]);

  // Memos
  const Feedbacks = React.useMemo(() => {
    const _onClose = () => {
      if (typeof (fatherStates?.setDialogMessage) !== "undefined")
        fatherStates.setDialogMessage(null);
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
          typeof (fatherStates) !== 'undefined' && fatherStates.dialogMessage !== null ?
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

          <Outlet />

        </Box>

        <Footer />

      </Box>
    </Box>
  );
};

export default Dashboard;