export const getApi = (apiUrl = "") => {
    return `${process.env.NEXT_PUBLIC_BLACKBOARD_URL}${apiUrl}`;
}