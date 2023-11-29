import { FormProvider, useForm } from 'react-hook-form';

import { MapPresentation } from './components/pages';

const App = () => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      position: [[51.505, -0.09]],
    },
  });

  return (
    <main>
      <section className="flex min-h-screen items-center justify-center">
        <FormProvider {...methods}>
          <MapPresentation />
        </FormProvider>
      </section>
    </main>
  );
};

export default App;
