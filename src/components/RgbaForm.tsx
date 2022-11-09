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
  let min;
  let max;
  switch (rgbaInfo.color) {
    case "red":
      min = `rgb(${rgbaObj[rgbaInfo.color]["min"]},255,255,255)`;
      max = `rgb(${rgbaObj[rgbaInfo.color]["max"]},255,255,255)`;
      break;
    case "green":
      max = `rgb(255,${rgbaObj[rgbaInfo.color]["max"]},255,255)`;
      min = `rgb(255,${rgbaObj[rgbaInfo.color]["min"]},255,255)`;
      break;
    case "blue":
      min = `rgb(255,255,${rgbaObj[rgbaInfo.color]["min"]},255)`;
      max = `rgb(255,255,${rgbaObj[rgbaInfo.color]["max"]},255)`;
      break;
    case "alpha":
      min = `rgb(${rgbaObj.red["min"]},${rgbaObj.green["min"]},${rgbaObj.blue["min"]},${rgbaObj[rgbaInfo.color]["min"]})`;
      max = `rgb(${rgbaObj.red["max"]},${rgbaObj.green["max"]},${rgbaObj.blue["max"]},${rgbaObj[rgbaInfo.color]["max"]})`;
      break;
  }
  return (
    <div className="w-full flex justify-between">
      <span>{rgbaInfo.displayName}</span>
      <div className="flex justify-between w-full">
        <input
          data-color={rgbaInfo.color}
          data-limit={"min"}
          id={`${rgbaInfo.color}Min`}
          value={`${rgbaObj[rgbaInfo.color]["min"]}`}
          placeholder="최소값"
          type={"number"}
          min={0}
          max={255}
          onChange={onInputChange}
          className=" border w-1/3"
        />

        <div style={{ background: `linear-gradient(90deg, ${min}, ${max})` }} className=" w-1/3"></div>
        <input
          data-color={rgbaInfo.color}
          data-limit={"max"}
          id={`${rgbaInfo.color}Max`}
          value={`${rgbaObj[rgbaInfo.color]["max"]}`}
          placeholder="최댓값"
          type={"number"}
          min={0}
          max={255}
          onChange={onInputChange}
          className=" border w-1/3"
        />
      </div>
    </div>
  );
}
export default RgbaForm;
