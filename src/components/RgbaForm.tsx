import { MinusIcon } from "@heroicons/react/24/outline";
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
    <div className="grid grid-cols-colorForm items-center pl-2 h-1/5">
      <span style={{ color: cssColor }}>{rgbaInfo.color.replace(rgbaInfo.color[0], rgbaInfo.color[0].toUpperCase())}</span>
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
