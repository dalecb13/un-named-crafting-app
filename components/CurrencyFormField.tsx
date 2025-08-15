import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  currencies: string[],
  currency: string,
  handleChangeCurrency: (currency: string) => void
  amount: string,
  handleChangeAmount: (amount: string) => void
}

const CurrencyFormField: React.FC<Props> = ({ currencies, currency, handleChangeCurrency, amount, handleChangeAmount}) => {
  return (
    <div className="relative inline-flex w-full">
      <Select
        value={currency}
        onValueChange={() => handleChangeCurrency}
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
          {/* <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>

      <Input
        className="w-full rounded-none rounded-r-lg"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => handleChangeAmount(e.target.value)}
      />
    </div>
  )
}

export default CurrencyFormField;
