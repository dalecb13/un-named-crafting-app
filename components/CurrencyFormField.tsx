import { Input } from "./ui/input";
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
    <div className="relative inline-flex w-full">
      <Select
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
        className="w-full rounded-none rounded-r-lg"
        type="number"
        placeholder="Price"
        value={totalPrice}
        onChange={(e)=> onChangeTotalPrice(e.target.value)}
      />
    </div>
  )
}

export default CurrencyFormField;
