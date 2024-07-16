import ListItem from "./ListItem";

export default function List({ usersIds }: string[]) {
    return (

        <div className="table-wrapper">
            {usersIds.map(id => <ListItem key={id} userId={id} />)}
        </div>
    )
}