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
  return (
    <div className="grid grid-cols-colorForm">
      <span>{rgbaInfo.color.replace(rgbaInfo.color[0], rgbaInfo.color[0].toUpperCase())}</span>
      <input
        className=" border w-full"
        data-color={rgbaInfo.color}
        data-limit={"min"}
        id={`${rgbaInfo.color}Min`}
        value={`${rgbaObj[rgbaInfo.color]["min"]}`}
        placeholder="최소값"
        type={"number"}
        min={0}
        max={255}
        onChange={onInputChange}
      />
      <MinusIcon className="w-10 justify-self-center" />
      <input
        className=" border w-full"
        data-color={rgbaInfo.color}
        data-limit={"max"}
        id={`${rgbaInfo.color}Max`}
        value={`${rgbaObj[rgbaInfo.color]["max"]}`}
        placeholder="최댓값"
        type={"number"}
        min={0}
        max={255}
        onChange={onInputChange}
      />
    </div>
  );
}
export default RgbaForm;
