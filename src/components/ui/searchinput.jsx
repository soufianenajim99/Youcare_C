import { Button } from "./button";
import { Input } from "./input";

const Searchinput = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Type To Search for Something" />
      <Button type="submit">Search</Button>
    </div>
  );
};

export default Searchinput;
