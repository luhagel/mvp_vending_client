import useSWR from "swr"

export const useUsers = () => {
    const { data, error } = useSWR(`http://localhost:4000/api/v1/users`)

    return {
        users: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useMe = () => {
    const { data, error } = useSWR(`http://localhost:4000/api/v1/auth/me`)

    return {
        me: data,
        isLoading: !error && !data,
        isError: error
    }
}