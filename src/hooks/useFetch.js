import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();

                if (!ignore) {
                    setData(result);
                }

            } catch (err) {

                if (!ignore) {
                    setError(err.message);
                }

            } finally {

                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            ignore = true;
        };

    }, [url]);

    return {
        data,
        loading,
        error
    };
}

export default useFetch;