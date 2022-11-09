import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { IRepo, IUser, ServerResponse } from "../../modals/modals";

export const hubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        //ключ объекта
        //с помощью  build формируем запрос по ключу searchUsers
        //.query - для запросов (для получения данных)
        //.mutation - для изменения данных
        // Добавляем два дженерика:
        // первый: указывает на то что мы получаем от сервера
        // второй: указывает какой параметр мы принимает, для осуществления нашего запроса
        searchUsers: build.query<IUser[], string>({
            query: (search: string) => ({
                url: `search/users`,
                params: {
                    q: search,
                    //для того чтоб прилетало ограниченое количество элементов
                    // можно указать per_page:10
                    per_page:10
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items
        }),
        getUserRepos: build.query<IRepo[],string>({
            query: (name:string) => ({
                url: `users/${name}/repos`
            })
        }),
        createUser: build.mutation<any, void>({
            query: () => ``
        })
    })
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} =  hubApi