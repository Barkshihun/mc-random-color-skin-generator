import { MinusIcon } from "@heroicons/react/24/outline";

function RgbaForm({
  rgbaInfo,
  onInputChange,
  rgbaObj,
}: {
  rgbaInfo: {
    color: Rgba;
  };
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rgbaObj: RgbaObj<number | "">;
}) {
  const cssColor = rgbaInfo.color === "alpha" ? "gray" : rgbaInfo.color;
  return (
    <div className="grid grid-cols-colorForm items-center pl-2 h-1/5">
      <span style={{ color: cssColor }}>{rgbaInfo.color.replace(rgbaInfo.color[0], rgbaInfo.color[0].toUpperCase())}</span>
      <input
        className="border w-full h-full pl-2"
        data-color={rgbaInfo.color}
        data-limit={"min"}
        id={`${rgbaInfo.color}Min`}
        value={`${rgbaObj[rgbaInfo.color]["min"]}`}
        type={"number"}
        min={0}
        max={255}
        onChange={onInputChange}
      />
      <MinusIcon className="w-7 sm:w-10 justify-self-center" />
      <input
        className="border w-full h-full pl-2"
        data-color={rgbaInfo.color}
        data-limit={"max"}
        id={`${rgbaInfo.color}Max`}
        value={`${rgbaObj[rgbaInfo.color]["max"]}`}
        type={"number"}
        min={0}
        max={255}
        onChange={onInputChange}
      />
    </div>
  );
}
export default RgbaForm;
