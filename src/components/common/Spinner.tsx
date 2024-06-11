import { LoaderCircle } from "lucide-react";

const Spinner = () => {
    return (
        <div className="text-blue-600 flex justify-center items-center animate-spin ">
            <LoaderCircle />
        </div>
    );    
};

export default Spinner;