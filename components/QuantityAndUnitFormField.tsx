import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
  units: string[];
  unit: string;
  handleChangeQuantityUnit: (quantityUnit: string) => void;
}

const QuantityAndUnitFormField: React.FC<Props> = ({ quantity, onChangeQuantity, units, unit, handleChangeQuantityUnit }) => {
  return (
    <div className="relative inline-flex w-full">
      <Input
        className="w-full rounded-none rounded-l-lg"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => onChangeQuantity(Number(e.target.value))}
      />

      <Select
        value={unit}
        onValueChange={() => handleChangeQuantityUnit}
      >
        <SelectTrigger className="w-[80px] right-0 top-0 bottom-0 rounded-none rounded-r-lg">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          {
            units.map((unitOption) => (
              <SelectItem
                key={unitOption}
                value={unitOption}
              >
                {unitOption}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default QuantityAndUnitFormField;
