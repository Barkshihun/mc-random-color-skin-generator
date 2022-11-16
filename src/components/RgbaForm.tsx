import { MinusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

function RgbaForm({
  rgbaInfo,
  onInputChange,
  rgbaObj,
  textLoad,
}: {
  rgbaInfo: {
    color: Rgba;
  };
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rgbaObj: RgbaObj<number | "">;
  textLoad: boolean;
}) {
  const cssColor = rgbaInfo.color === "alpha" ? "gray" : rgbaInfo.color;
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);
  const minValue = rgbaObj[rgbaInfo.color]["min"];
  const maxValue = rgbaObj[rgbaInfo.color]["max"];
  return (
    <div className="grid grid-cols-colorForm items-center pl-2 h-1/5 relative">
      {rgbaInfo.color === "alpha" && (
        <div className="absolute sm:left-[-6px] left-[-4px] group">
          <QuestionMarkCircleIcon className="sm:w-3 w-[10px] cursor-pointer" strokeWidth={2} />
          <p className="shadow-lg absolute text-sm p-2 text-white text-center hidden w-30 break-keep bg-slate-500 rounded-lg group-hover:block z-10">Alpha값은 오버레이 부분에만 적용됩니다.</p>
        </div>
      )}
      <span className="cursor-default" style={{ color: cssColor }}>
        {rgbaInfo.color.replace(rgbaInfo.color[0], rgbaInfo.color[0].toUpperCase())}
      </span>
      <CSSTransition nodeRef={minInputRef} in={textLoad} classNames="text-load" timeout={300}>
        <input
          className={`border w-full h-[80%] pl-3 rounded-md text-sm invalid:ring-2 invalid:ring-red-400 ${minValue > maxValue ? "!ring-2 !ring-red-400" : ""}`}
          ref={minInputRef}
          data-color={rgbaInfo.color}
          data-limit={"min"}
          id={`${rgbaInfo.color}Min`}
          value={`${minValue}`}
          type={"number"}
          min={0}
          max={255}
          onChange={onInputChange}
          required
          title=""
        />
      </CSSTransition>
      <MinusIcon className="w-7 sm:w-10 justify-self-center" />
      <CSSTransition nodeRef={maxInputRef} in={textLoad} classNames="text-load" timeout={300}>
        <input
          className={`border w-full h-[80%] pl-3 rounded-md text-sm invalid:ring-2 invalid:ring-red-400 ${minValue > maxValue ? "!ring-2 !ring-red-400" : ""}`}
          ref={maxInputRef}
          data-color={rgbaInfo.color}
          data-limit={"max"}
          id={`${rgbaInfo.color}Max`}
          value={`${maxValue}`}
          type={"number"}
          min={0}
          max={255}
          onChange={onInputChange}
          required
          title=""
        />
      </CSSTransition>
    </div>
  );
}
export default RgbaForm;
