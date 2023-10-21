import { useState } from "@/core";
import { useEffect } from "@/core/hooks/useEffect";

interface useFetchProps<T> {
  fetchFunction: () => Promise<T>;
}

const useFetch = <T>({ fetchFunction }: useFetchProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerRetry, setTriggerRetry] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const newData = await fetchFunction();
      setData(newData);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    setTriggerRetry(!triggerRetry);
  };

  useEffect(() => {
    fetchData();
  }, [triggerRetry]);

  return { data, loading, error, retry };
};

export default useFetch;
