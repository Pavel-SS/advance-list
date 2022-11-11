import {Link} from "react-router-dom";

import GitHubLogo from './../asset/icon/github.svg';

export const Navigation = () => {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-green-300 text-white">
            <div className="text-2xl font-bold text-blue-700"><img  className="w-7 inline-block mr-2" src={GitHubLogo} alt='logo'/>github searcher</div>
            <span>
                <Link to='/' className="whitespace-nowrap text-2xl font-medium text-slate-600 hover:text-blue-500 mr-5">Search</Link>
                <Link to='/favourites' className="whitespace-nowrap text-2xl font-medium text-slate-600 hover:text-blue-500">Favourites</Link>
            </span>
        </nav>
    )
}