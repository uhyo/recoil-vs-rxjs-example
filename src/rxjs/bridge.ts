import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export const useObservable = <T>(observable: Observable<T>): T | undefined => {
  const [current, setCurrent] = useState<T | undefined>(undefined);
  useEffect(() => {
    const subscription = observable.subscribe({
      next: (value) => {
        setCurrent(value);
      },
      error: (error) => {
        throw error;
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);
  return current;
};
