import { useAppSelector } from "../../hook/redux"

export const FavoritPage = () => {
    const {favourites} = useAppSelector(state=>state.hub)

    if(favourites.length == 0) {
        return <p className="text-center">No items</p>
    }
    
    return(
        <div  className="flex justify-center pt-10 mx-auto h-screen w-screen">
            <ul className="list-nonne">
                {favourites.map(item => (
                    <li key={item}>
                        <a href={item} target="_blank">{item}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}