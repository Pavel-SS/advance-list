import React , {useState} from 'react'
import { useActions } from '../hook/actions';
import { useAppSelector } from '../hook/redux';
import { IRepo } from "../modals/modals";

export const RepoList = ({repo}:{repo: IRepo}) => {

    const {addFavorite, removeFavorite} = useActions()

    const {favourites}= useAppSelector(state => state.hub)

    const [isFavourites, setIsFavourites] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        // в костомный хук передаем параметр который будет являтся уникальным идентификатором для того репозитория который мы хотим сохранить 
        addFavorite(repo.html_url)
        setIsFavourites(true)
    }
    const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        // в костомный хук передаем параметр который будет являтся уникальным идентификатором для того репозитория который мы хотим сохранить 
        removeFavorite(repo.html_url)
        setIsFavourites(false)
    }

    return (
        <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank">
               <h2>{repo.full_name}</h2>
                <p>
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers:  <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">
                    {repo?.description}
                </p>
               {!isFavourites && <button className="py-2 px-4 mr-2 bg-lime-400 rounded hover:shadow-md transition-all"
                        onClick={addToFavourite}>
                    add to favourites
                </button>
                }
                {isFavourites &&<button className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
                        onClick={removeFromFavourite}>
                    remove from favourites
                </button> 
                } 
            </a> 
        </div>
    )
}