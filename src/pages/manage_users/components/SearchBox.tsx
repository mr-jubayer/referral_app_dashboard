import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <Input
        type="text"
        placeholder="Search users..."
        value={value}
        onChange={onChange}
        className="pl-10"
      />
    </div>
  );
}

export default SearchBox;
