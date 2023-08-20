// form
import { FieldValues, FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

interface Props<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;

  noValidate?: boolean;
};

export default function FormProvider<T extends FieldValues>({ children, onSubmit, methods, noValidate }: Props<T>) {
  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        noValidate={typeof noValidate === 'undefined' ? true : noValidate}
      >
        {children}
      </form>
    </Form>
  );
};