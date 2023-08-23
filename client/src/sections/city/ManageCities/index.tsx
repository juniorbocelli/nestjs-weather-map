import React from 'react';
import * as Yup from 'yup';
// @mui
import {
  Box,
  Typography,

  SxProps,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Theme } from '@mui/material/styles';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { Container } from 'src/components/container';
import { Title } from 'src/components/title';
import FormProvider from 'src/components/hook-form';
import { SendCityForm } from 'src/components/send-city-form';
import { CityCard } from 'src/components/city-card';
// contexts
import { useManageCitiesContext } from 'src/sections/city/ManageCities/context';
import { useFeedbackContext } from 'src/hooks/feedbacks';
//
import Strings from 'src/shared/strings';
import uuidv4 from 'src/utils/uuidv4';

// ----------------------------------------------------------------------

interface IManageCitiesProps {
  sx?: SxProps<Theme>;
};

type FormValuesProps = {
  name: string;
};

const ManageCities: React.FC<IManageCitiesProps> = ({ sx }) => {
  const context = useManageCitiesContext();
  const { useComponentDidMount } = context.effects;
  const { createCity } = context.apis;
  const { cities, setIdToRemove } = context.states;

  const { states: feebackStates } = useFeedbackContext();
  const { isQueryingAPI } = feebackStates;

  // Efects
  useComponentDidMount();

  // Form
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required(Strings.ErrorMessages.forms.requiredField),
  });

  const defaultValues = {
    name: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    // control business rules
    try {
      createCity(data.name);
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.error(error);

      reset();
    };
  };

  return (
    <Container sx={{ minHeight: '100%', p: { xs: 1, md: 5 } }}>
      <Title>
        Cidades Cadastradas
      </Title>


      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <SendCityForm isQueringApi={isQueryingAPI} />
        </Box>
      </FormProvider>


      <Box>
        {
          cities.length === 0 ?
            <Typography>
              Você ainda não tem cidades cadastradas!
            </Typography>
            :
            <Box
              sx={
                {
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)', // 0
                    sm: 'repeat(1, 1fr)', // 600
                    md: 'repeat(2, 1fr)', // 900
                    lg: 'repeat(3, 1fr)', // 1200
                    xl: 'repeat(4, 1fr)', // 1536
                  },
                }
              }
            >

              {
                cities.map(c => (
                  <CityCard
                    cityData={c}
                    setToRemove={(id: number) => setIdToRemove(id)}
                    sx={{ flexGrow: 1 }}
                    key={uuidv4()}
                  />
                ))
              }
            </Box>
        }
      </Box>
    </Container >
  );
};

export default ManageCities;