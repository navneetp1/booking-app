type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;

};

export default function PriceFilter({ selectedPrice, onChange}: Props){
    return (
        <>
        <div>
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select 
                    className="p-2 border rounded-md w-full"
                    value={selectedPrice} 
                    onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
            <option value="">Select a Max Price</option>
            {[500, 1000, 2000, 4000, 6000, 8000].map((price) => (
                <option value={price}>{price}</option> 
            ))}
            </select>
        </div>
        </>
    )
}