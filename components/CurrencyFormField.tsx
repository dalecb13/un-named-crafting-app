import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  currencies: string[],
  currency: string,
  onChangeCurrency: (currency: string) => void
  totalPrice: string,
  onChangeTotalPrice: (amount: string) => void
}

const CurrencyFormField: React.FC<Props> = ({ currencies, currency, onChangeCurrency, totalPrice, onChangeTotalPrice}) => {
  return (
    <div className="w-full space-y-2">
      <Label
        htmlFor="currencyAndPrice"
        className="text-sm font-medium text-slate-700 mb-2"
      >
        Total Price
      </Label>
      <div className="relative inline-flex w-full">
        <Select
          name="currency"
          value={currency}
          onValueChange={onChangeCurrency}
        >
          <SelectTrigger className="w-[80px] left-0 top-0 bottom-0 rounded-none rounded-l-lg">
            <SelectValue placeholder="USD" />
          </SelectTrigger>
          <SelectContent>
            {
              currencies.map((unit) => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>

        <Input
          id="currencyAndPrice"
          className="w-full rounded-none rounded-r-lg"
          type="number"
          placeholder="Price"
          value={totalPrice}
          onChange={(e)=> onChangeTotalPrice(e.target.value)}
        />
      </div>
    </div>
  )
}

export default CurrencyFormField;
