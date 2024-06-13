import { LoaderCircle } from "lucide-react";

const Spinner = () => {
    return (
        <div className="text-blue-600 flex justify-center items-center animate-spin p-4 ">
            <LoaderCircle />
        </div>
    );    
};

export default Spinner;