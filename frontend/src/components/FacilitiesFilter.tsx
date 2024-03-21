import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FacilitiesFilter({ selectedFacilities, onChange}: Props) {


    return (
        <>
        <div className="border-b border-slate-400 pb-5">
            <h3 className="text-md font-semibold mb-2">Facilities</h3>
            {hotelFacilities.map((facility) => (
                <label key={facility} className="flex items-center space-x-2">
                    <input type="checkbox"
                           value={facility}
                           className="rounded"
                           checked={selectedFacilities.includes(facility)}
                           onChange={onChange} />

                        <span>{facility}</span>
                </label>
            ))}
        </div>
        </>
    )
}