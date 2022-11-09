function RgbaForm({
  rgbaInfo,
  onInputChange,
  rgbaObj,
}: {
  rgbaInfo: {
    displayName: "R" | "G" | "B" | "A";
    color: Rgba;
  };
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rgbaObj: RgbaObj<number | "">;
}) {
  return (
    <div className="w-full flex">
      <span>{rgbaInfo.displayName}</span>
      <div className="flex justify-evenly w-full">
        <input
          data-color={rgbaInfo.color}
          data-limit={"min"}
          id={`${rgbaInfo.color}Min`}
          value={`${rgbaObj[rgbaInfo.color]["min"]}`}
          placeholder="최소값"
          type={"number"}
          min={0}
          max={rgbaInfo.color === "alpha" ? 100 : 255}
          onChange={onInputChange}
          className=" border w-1/3"
        />
        <input
          data-color={rgbaInfo.color}
          data-limit={"max"}
          id={`${rgbaInfo.color}Max`}
          value={`${rgbaObj[rgbaInfo.color]["max"]}`}
          placeholder="최댓값"
          type={"number"}
          min={0}
          max={rgbaInfo.color === "alpha" ? 100 : 255}
          onChange={onInputChange}
          className=" border w-1/3"
        />
      </div>
    </div>
  );
}
export default RgbaForm;
