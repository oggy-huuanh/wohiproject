import { useEffect, useState } from 'react'
import { fetchJson } from '../api/mealApi.js'



function useFetch(url) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let ignore = false
        async function load() {
            if (url == null) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true)
                setError(null)
                let response = await fetchJson(url);
                if (!ignore){
                    setData(response);
                }
            } catch (err) {
                if (!ignore){
                    setError(err.message);
                }
            } finally {
                if (!ignore){
                    setLoading(false)
                }
            }
        }
        load()
        return () => {ignore = true}
    }, [url])

    return { data, loading, error }



}
export default useFetch