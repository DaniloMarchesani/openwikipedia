import { Bold, CircleX, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { motion as m } from "framer-motion";
import { Button } from "../ui/button";

interface IToolBoxProps {
    setIsEditing: (value: boolean) => void;
}

const EditToolsBox = ({setIsEditing}: IToolBoxProps ) => {
    

  return (
    <m.div 
     initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut"}}   
        className="z-50 fixed top-4 left-1/2  px-2 py-1 bg-white flex item-center justify-center rounded-full drop-shadow-xl">
        
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      {/* Button for close the edit mode */}
      <Button 
        variant={"ghost"} 
        size={"icon"} 
        onClick={() => setIsEditing(false)}
        className="rounded-full text-red-500 hover:text-red-600">
            <CircleX />
        </Button>
    </m.div>
  );
};

export default EditToolsBox;
