import List from "../../common/List"
import { useGetUsersQuery } from "../../../app/api/userApiSlice"
import { Link } from "react-router-dom"

export default function AdminUsers() {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

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

            <button><Link to="create" className="btn-add btn">Create New User</Link></button>
        </section>
    )
}