export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination( {page, pages, onPageChange}:Props ){
    const pageNos = []
    for(let i = 1; i<=pages;i++){
        pageNos.push(i);
    }

    return (
        <>
        <div className="flex justify-center">
            <ul className="flex border border-slate-300">
                {pageNos.map((number) => (
                    <li className={`px-2 py-1 ${page === number ? "bg-gray-200": ""}`}>
                        <button className="" onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
} 