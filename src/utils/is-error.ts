import { ErrorMessage } from "../types/types"

export const isErrorWithMessage = (error: unknown): error is ErrorMessage => {
    return (
        typeof error === "object" &&
        error !== null &&
        'data' in error && 
        typeof (error as Record<string, unknown>).data === 'object'
    )
}