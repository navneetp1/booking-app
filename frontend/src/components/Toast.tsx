import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
}

export default function Toast({message, type, onClose}: ToastProps){

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000)

        return ()=> {
            clearTimeout(timer);
        }
    }, [onClose])

    const styles = type === "SUCCESS" ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-yellow-500 text-black max-w-md": 
                                        "fixed top-4 right-4 z-50 p-4 rounded-md bg-cyan-500 text-white max-w-md"
    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">
                    {message}
                </span>
            </div>
        </div>
    )
}