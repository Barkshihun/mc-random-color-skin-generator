function RgbaForm({
  rgbaList,
  onInputChange,
  rgbaObj,
}: {
  rgbaList: {
    displayName: string;
    color: Rgba;
  };
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rgbaObj: RgbaObj<number | "">;
}) {
  return (
    <div className="w-full flex justify-between">
      <span>{rgbaList.displayName}</span>
      <input
        data-color={rgbaList.color}
        data-limit={"min"}
        id={`${rgbaList.color}Min`}
        value={`${rgbaObj[rgbaList.color]["min"]}`}
        placeholder="최소값"
        type={"number"}
        min={0}
        max={255}
        onChange={onInputChange}
        className=" border w-3/4"
      />
      <input
        data-color={rgbaList.color}
        data-limit={"max"}
        id={`${rgbaList.color}Max`}
        value={`${rgbaObj[rgbaList.color]["max"]}`}
        placeholder="최댓값"
        type={"number"}
        min={0}
        max={255}
        onChange={onInputChange}
        className=" border w-3/4"
      />
    </div>
  );
}
export default RgbaForm;
