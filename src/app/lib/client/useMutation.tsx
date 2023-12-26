import { useState } from "react"

interface UseMutationState<T> {
    loading: boolean;
    data?: T;
    error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>]
export default function useMutation<T = any>(url:string):UseMutationResult<T> {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<undefined | any>(undefined);
    const [error, setError] = useState<undefined | any>(undefined);

    const [state, setState] = useState<UseMutationState<T>>({
        loading: false,
        data: undefined,
        error: undefined
    })

    const func = (data: any) => {
        setState((prev) => ({...prev, loading: true}));
 
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json().catch((err) => {console.log(err)}))
        .then((data) => setState((prev)=> ({...prev, data, loading: false})))
        .catch((error) => setState((prev)=> ({...prev, error, loading: false})));
    }

    return [func, {...state}]
}