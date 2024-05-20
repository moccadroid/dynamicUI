import type { FormikContextType } from 'formik';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

const useSafeFormikContext = <Values = any>(): FormikContextType<Values> | null => {

  useEffect(() => {
    const originalWarn = console.warn;

    console.warn = (...args: any[]) => {
      const message = Array.isArray(args) ? args.join(' ') : args;
      if (message.includes('Warning: Formik context is undefined')) {
        return; // Suppress specific warning message
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn; // Restore original console.warn
    };
  }, []);

  try {
    return useFormikContext<Values>();
  } catch (error) {
    return null;
  }
};

export default useSafeFormikContext;
