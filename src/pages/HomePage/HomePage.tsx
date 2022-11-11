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
       //Если мы вернулись фокусом на данную страницу, тогда необxодимо сделать автоматический запрос
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
                {areReposLoading && <div className="text-center">
                    <div role="status">
                        <svg className="inline mr-2 w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                }
                {repos?.map(repo => <RepoList repo={repo} key = {repo.id}/> )}
            </div>
           </div>
           
        </div>
    )
} 