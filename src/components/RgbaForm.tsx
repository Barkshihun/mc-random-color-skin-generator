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
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);
  return (
    <div className="grid grid-cols-colorForm items-center pl-2 h-1/5 relative">
      {rgbaInfo.color === "alpha" && (
        <div className="absolute sm:left-[-6px] left-[-4px] group">
          <QuestionMarkCircleIcon className="sm:w-3 w-[10px] cursor-pointer" strokeWidth={2} />
          <p className="absolute text-sm p-2 text-white text-center hidden w-30 break-keep bg-slate-500 rounded-lg group-hover:block">Alpha값은 오버레이 부분에만 적용됩니다.</p>
        </div>
      )}
      <span className="cursor-default" style={{ color: cssColor }}>
        {rgbaInfo.color.replace(rgbaInfo.color[0], rgbaInfo.color[0].toUpperCase())}
      </span>
      <CSSTransition nodeRef={nodeRef1} in={textLoad} classNames="text-load" timeout={300}>
        <input
          ref={nodeRef1}
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
      </CSSTransition>
      <MinusIcon className="w-7 sm:w-10 justify-self-center" />
      <CSSTransition nodeRef={nodeRef2} in={textLoad} classNames="text-load" timeout={300}>
        <input
          ref={nodeRef2}
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
      </CSSTransition>
    </div>
  );
}
export default RgbaForm;
