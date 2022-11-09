import {Link} from "react-router-dom";

export const Navigation = () => {
    return (
        <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-orange-200 text-white">
            <h3 className="text-2xl font-bold text-indigo-500"> Search</h3>
            <span>
                <Link to='/' className="whitespace-nowrap text-2xl font-medium text-slate-500 hover:text-amber-400 mr-5">Home</Link>
                <Link to='/favourites' className="whitespace-nowrap text-2xl font-medium text-slate-500 hover:text-amber-400">Favourites</Link>
            </span>
        </nav>
    )
}