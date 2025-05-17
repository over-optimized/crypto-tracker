export function Dropdown() {
  return (
    <div>
      <label>
        <span>Currency </span>
        <select name="currency-dropdown" id="currency-dropdown">
          <option value=""></option>
          <option value="btc">BTC</option>
        </select>
      </label>
    </div>
  );
}
