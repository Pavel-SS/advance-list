import {useState, useEffect} from "react"
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../../store/hub/hub.api"
import { useDebounce } from "../../hook/debounce"
import { RepoList } from "../../components/RepoList"


export function HomePage ()  {

    const [search, setSearch] = useState('')
    const [dropDown, setDropDown] = useState(false)
    const debounce = useDebounce(search)
   
    
    const {isLoading, isError, data} = useSearchUsersQuery(debounce, {
       skip: debounce.length < 1,
       //Если мы вернулись фокусом на данную страницу, тогда необзодимо сделать автоматический запрос
       // Это делается с помощью refetchOnFocus
       // Но его необходимо настроить. Настройка находится в файле  store (setupListeners)
       refetchOnFocus: true
    })
    // первым элементом массива мы получаем функцию которая позволяет по запросу загружать необходимые данные
    // вторым элементом приходит объект с параметрами которые получаются у нас в обычном хуке запроса useSearchUsersQuery
    // isLoading: areReposLoading, data: repos - просто переназвали параметры, чтоб не повторялись имена
    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    useEffect(()=>{
        setDropDown(debounce.length > 0 && data?.length! > 0)
    },[debounce, data])


    const clickHandler = (name: string) => {
        fetchRepos(name)
        setDropDown(false)
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
           {isError && <p className="text-center text-red-700">Something went wrong...</p>}
           <div className="relative w-[560px]">
            <input 
                type="text"
                className="border py-2 px-4 w-full h-[42px] mb-2"
                placeholder="Search for Github username..."
                value = {search}
                onChange ={(e) => setSearch(e.target.value)}
            />
            { dropDown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[250px] overflow-y-scroll shadow-md bg-white ">
               {isLoading && <p className="text-center">Loading...</p>}
               {data?.map(item => (
                    <li key={item.id}
                        className="py-2 px-4 hover:text-orange-200 transition-colors cursor-pointer"
                        onClick={() => clickHandler(item.login)}
                    >
                        {item.login}
                    </li>
               ))}
            </ul>}
            <div className="container">
                {areReposLoading && <p className="text-center"> Repos are loading...</p>}
                {repos?.map(repo => <RepoList repo={repo} key = {repo.id}/> )}
            </div>
           </div>
           
        </div>
    )
} 