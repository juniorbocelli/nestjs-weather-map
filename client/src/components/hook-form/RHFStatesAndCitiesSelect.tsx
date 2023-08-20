import React from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import {
  Grid,
  MenuItem,

  TextFieldProps,
  GridProps,
} from '@mui/material';
// components
import { RHFSelect } from 'src/components/hook-form/RHFSelect';
// assets
import { statesAndCities } from 'src/assets/data';

// ----------------------------------------------------------------------
type Option = {
  label: string;
  value: string;
};
// ----------------------------------------------------------------------

interface IRHFStatesAndCitiesSelectProps {
  stateFieldName: string;
  cityFieldName: string;

  stateLabelName?: string;
  cityLabelName?: string;

  gridProps?: GridProps;
  stateFieldProps?: TextFieldProps;
  cityFieldProps?: TextFieldProps;
};

const RHFStatesAndCitiesSelect: React.FC<IRHFStatesAndCitiesSelectProps> = ({
  stateFieldName,
  cityFieldName,

  stateLabelName,
  cityLabelName,

  gridProps,
  stateFieldProps,
  cityFieldProps
}) => {
  const { watch } = useFormContext();

  const {
    states,
    cities,
  } = statesAndCities;
  const selectedState = watch(stateFieldName);

  const _citiesOptions: Option[] = React.useMemo(() => {
    const index = (): number => {
      for (let i = 0; i < states.length; i += 1)
        if (states[i][0] === selectedState)
          return i;

      return 0;
    };

    return cities[index()].map(item => ({
      label: item,
      value: item,
    }));
  }, [cities, states, selectedState]);

  return (
    <Grid spacing={2} {...gridProps} container>
      <Grid item xs={12} md={4}>
        <RHFSelect
          {...stateFieldProps}
          name={stateFieldName}
          label={typeof stateLabelName !== 'undefined' ? stateLabelName : stateFieldName}
          defaultValue=""
        >
          {
            states.map((item, key) => (
              <MenuItem key={key} value={item[0]}>
                {item[1]}
              </MenuItem>
            ))
          }
        </RHFSelect>
      </Grid>

      <Grid item xs={12} md={8}>
        <RHFSelect
          {...cityFieldProps}
          name={cityFieldName}
          label={typeof cityLabelName !== 'undefined' ? cityLabelName : cityFieldName}
          defaultValue=""
        >
          {
            _citiesOptions.map((item, key) => (
              <MenuItem key={key} value={item.value}>
                {item.label}
              </MenuItem>
            ))
          }
        </RHFSelect>
      </Grid>
    </Grid>
  );
};

export default RHFStatesAndCitiesSelect;