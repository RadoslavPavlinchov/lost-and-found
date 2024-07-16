import List from "../../common/List"
import { useGetUsersQuery } from "../../../app/api/userApiSlice"

export default function AdminUsers() {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    }

    if (isError) {
        content = <div>Error: {error.data?.message}</div>
    }

    if (isSuccess) {
        const { ids } = users

        content = <List usersIds={ids} />
    }

    return (
        <section className="card users-container">
            {content}
        </section>
    )
}