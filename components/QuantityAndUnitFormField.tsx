import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  quantity: number;
  handleChangeQuantity: (quantity: number) => void;
  units: string[];
  unit: string;
  handleChangeQuantityUnit: (quantityUnit: string) => void;
}

const QuantityAndUnitFormField: React.FC<Props> = ({ quantity, handleChangeQuantity, units, unit, handleChangeQuantityUnit }) => {
  return (
    <div className="relative inline-flex w-full">
      <Input
        className="w-full rounded-none rounded-l-lg"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => handleChangeQuantity(Number(e.target.value))}
      />

      <Select>
        <SelectTrigger className="w-[80px] right-0 top-0 bottom-0 rounded-none rounded-r-lg">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default QuantityAndUnitFormField;
