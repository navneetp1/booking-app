import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

export default function Search() {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");
   
    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(), 
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption
    };

    const { data:hotelData } = useQuery(["searchHotels", searchParams, sortOption], ()=> apiClient.searchHotels(searchParams));
     
    function handleStarsChange(event: React.ChangeEvent<HTMLInputElement>){
        const starRating = event.target.value;

        setSelectedStars((prevStars) => 
            event.target.checked ?
            [...prevStars, starRating]:
            prevStars.filter((star) => star !== starRating)
        );
    }

    function handleHotelTypeChange(event: React.ChangeEvent<HTMLInputElement>){
        const Hoteltype = event.target.value;

        setSelectedHotelTypes((prevTypes) => 
            event.target.checked ? 
            [...prevTypes, Hoteltype] :
            prevTypes.filter((type) => type != Hoteltype) )
    } 

    function handleFacilityChange(event: React.ChangeEvent<HTMLInputElement>){
        const facilities = event.target.value;

        setSelectedFacilities((prevFacility) =>
         event.target.checked ? 
         [...prevFacility, facilities] :
         prevFacility.filter((facility) => facility != facilities) )
    }

    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            {/* filter grid */}
            <div className="rounded-lg border border-slate-400 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-400 pb-5">
                        Filter by:</h3>
                    
                    <StarRatingFilter 
                         selectedStars={selectedStars}
                         onChange={handleStarsChange}
                    />

                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange}
                    />

                    <FacilitiesFilter 
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilityChange}
                    />

                    <PriceFilter 
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => setSelectedPrice(value)}
                    />

                </div>
            </div>

            {/* search results grid */}
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} {hotelData?.pagination.total == 1 ? "Hotel ": "Hotels "}found
                        {search.destination ? ` in ${search.destination}`: ""}
                    </span>
                    {/* todo sort options */}

                    <select 
                        className="p-2 rounded-md border"
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}>

                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night(Ascending)</option>
                        <option value="pricePerNightDesc">Price Per Night(Descending)</option>
                    </select>

                </div>

                {hotelData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel}/>
                ))}

                <Pagination page={hotelData?.pagination.page || 1} 
                            pages={hotelData?.pagination.pages || 1}
                            onPageChange={(page) => setPage(page)}/>
            </div> 

        </div>
        </>
    )
}