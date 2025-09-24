import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import localforage from "localforage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60 * 24,
        }
    }
})

// Only set up persistence on client side
if (typeof window !== 'undefined') {
    const localStoragePersister = createAsyncStoragePersister({
        storage: localforage,
        key: "TODO_LIST",
    })

    persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 24,
    })
}

export default queryClient;
