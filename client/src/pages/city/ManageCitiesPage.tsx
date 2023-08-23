import React from 'react';
// sections
import {
  ManageCities,
  useManageCitiesStates,
  ManageCitiesProvider,
} from 'src/sections/city';

//
import Strings from 'src/shared/strings';

// ----------------------------------------------------------------------

export default function ManageCitiesPage() {
  const states = useManageCitiesStates();

  // Effects
  React.useEffect(() => {
    document.title = `${Strings.Page.PAGE_TITLE_COMPANY_NAME}${Strings.Page.PAGE_TITLE_SEPARATOR}Cidades`;
  }, []);

  return (
    <ManageCitiesProvider states={states}>
      <ManageCities />
    </ManageCitiesProvider>
  );
};
