export const getApi = (apiUrl: string) => {
    return `${process.env.NEXT_PUBLIC_BLACKBOARD_URL}${apiUrl}`;
}