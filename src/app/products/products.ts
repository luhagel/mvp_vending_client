import useSWR from "swr"

export const useProducts = () => {
    const { data, error } = useSWR(`http://localhost:4000/api/v1/products`)
    console.log(data)
    return {
        products: data,
        isLoading: !error && !data,
        isError: error
    }
}