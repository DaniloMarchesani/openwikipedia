import { Bold, CircleX, Italic, Save, Underline, Undo2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { motion as m } from "framer-motion";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IToolBoxProps {
  setIsEditing: (value: boolean) => void;
  handleUpdateArticle?: () => void;
}

const EditToolsBox = ({ setIsEditing, handleUpdateArticle}: IToolBoxProps) => {
  

  return (
    <m.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
      className="z-50 fixed top-4 p-1 bg-white dark:bg-gray-900 dark:border dark:border-slate-700 flex item-center justify-center rounded-full drop-shadow-xl gap-2"
    >
      
      {/* Toggle group for text formatting */}
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

      {/* Select for a font */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Font" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fonts</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Undo button for revert all changes */}
      <Button variant={"ghost"} className="rounded-full" size={"icon"}>
      <Undo2 />
      </Button>


      {/* Button for save the article */}
      <Button variant={"ghost"} className="rounded-full" size={"icon"} onClick={handleUpdateArticle}>
        <Save />
      </Button>
      {/* Button for close the edit mode */}
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => setIsEditing(false)}
        className="rounded-full text-red-500 hover:text-red-600"
      >
        <CircleX />
      </Button>
    </m.div>
  );
};

export default EditToolsBox;
