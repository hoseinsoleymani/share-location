import { MapPresentation } from './components/pages';
import { FormProvider, useForm } from 'react-hook-form';

function App() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      position: [[51.505, -0.09]],
    },
  });

  return (
    <main>
      <section className="flex items-center justify-center min-h-screen">
        <FormProvider {...methods}>
          <MapPresentation />
        </FormProvider>
      </section>
    </main>
  );
}

export default App;
