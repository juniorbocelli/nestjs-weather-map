import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
// paths
import * as Paths from './paths';
//
import {
  // Auth
  LoginPage,

} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    /**
     * Auth
     */
    {
      path: Paths.PATH_AUTH.root,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: Paths.PATH_AUTH.login,
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },

    /**
     * Dashboard
     */
    {
      path: Paths.PATH_DASHBOARD.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: Paths.PATH_DASHBOARD.home, element: <GeneralAppPage /> },
      ],
    },


    /**
     * Registers
     */
    {
      path: Paths.PATH_REGISTER.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={Paths.PATH_REGISTER.main} replace />, index: true },
        { path: 'registros', element: <RegistersPage /> },

        // Users
        { path: Paths.PATH_REGISTER.users.mainUsers.list, element: <MainUsersListPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.manage, element: <ManageSubuserPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.address.create, element: <SetAddressPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.address.edit, element: <SetAddressPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.information.create, element: <SetInformationPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.information.edit, element: <SetInformationPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.creditCard.create, element: <SetCreditCardPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.creditCard.edit, element: <SetCreditCardPage /> },
        { path: Paths.PATH_REGISTER.users.subusers.create, element: <CreateSubuserPage /> },

        // Products
        { path: Paths.PATH_REGISTER.productsList, element: <ProductsListPage /> },

        // Categories
        { path: Paths.PATH_REGISTER.categoriesList, element: <CategoriesListPage /> },
        { path: Paths.PATH_REGISTER.categoriesCreate, element: <CategoryNewPage /> },
        { path: Paths.PATH_REGISTER.categoriesEdit, element: <CategoryEditPage /> },

        // Labels
        { path: Paths.PATH_REGISTER.labelsList, element: <LabelsListPage /> },
        { path: Paths.PATH_REGISTER.labelsCreate, element: <LabelNewPage /> },
        { path: Paths.PATH_REGISTER.labelsEdit, element: <LabelEditPage /> },

        // Commercial Conditions
        { path: Paths.PATH_REGISTER.commercialSituationsList, element: <CommercialConditionsListPage /> },
        { path: Paths.PATH_REGISTER.commercialSituationsCreate, element: <CommercialConditionNewPage /> },
        { path: Paths.PATH_REGISTER.commercialSituationsEdit, element: <CommercialConditionEditPage /> },

        // Subproducts
        { path: Paths.PATH_REGISTER.subproductsList, element: <SubproductsListPage /> },
        { path: Paths.PATH_REGISTER.subproductsCreate, element: <SubproductNewPage /> },
        { path: Paths.PATH_REGISTER.subproductsEdit, element: <SubproductEditPage /> },
      ],
    },


    /**
     * Promotions
     */
    {
      path: Paths.PATH_REGISTER.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={Paths.PATH_PROMOTION.main} replace />, index: true },
        { path: 'promocoes', element: <PromotionsPage /> },
        // Coupons
        { path: Paths.PATH_PROMOTION.couponsList, element: <CouponsListPage /> },
        { path: Paths.PATH_PROMOTION.coupomCreate, element: <CouponNewPage /> },
        { path: Paths.PATH_PROMOTION.coupomEdit, element: <CouponNewPage /> },
      ],
    },


    /**
     * Orders
     */
    {
      path: Paths.PATH_ORDER.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={Paths.PATH_ORDER.main} replace />, index: true },
        { path: Paths.PATH_ORDER.main, element: <OrdersPage /> },
        // Orders
        { path: Paths.PATH_ORDER.ordersList, element: <OrdersListPage /> },
        // Project Orders
        { path: Paths.PATH_ORDER.projectOrdersList, element: <ProjectOrdersListPage /> },
      ],
    },


    /**
     * Reports
     */
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'relatorios', element: <ReportsPage /> },
      ],
    },


    /**
     * E-commerce
     */
    {
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: Paths.PATH_ECOMMERCE.main, element: <EcommercePage /> },
        { path: Paths.PATH_ECOMMERCE.bannersSet, element: <SetBannersPage /> },
      ],
    },


    /**
     * Others
     */
    {
      element: <CompactLayout />,
      children: [
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
