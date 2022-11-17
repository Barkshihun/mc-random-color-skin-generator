import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { rgbaObjChange } from "../store/rgbaObjSlice";
import { RootState } from "../store";
import RgbaForm from "../components/RgbaForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Home({ setIsGenerated }: { setIsGenerated: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [textLoad, setTextLoad] = useState(true);
  const dispatch = useDispatch();
  const MAX_VALUE = 255;
  const getRgbaObj = (state: RootState) => state.rgbaObj.value;
  const rgbaObjSelector = createSelector(getRgbaObj, (rgbaObj) => rgbaObj);
  const rgbaObj = useSelector(rgbaObjSelector);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { color, limit } = event.target.dataset as { color: Rgba; limit: "min" | "max" };
    if (!event.target.value) {
      dispatch(rgbaObjChange({ color, limit, input: "" }));
      return;
    }
    const input = parseInt(event.target.value);
    dispatch(rgbaObjChange({ color, limit, input }));
  };
  const rgbaList: RgbaList = [{ color: "red" }, { color: "green" }, { color: "blue" }, { color: "alpha" }];
  const makeErrMsgArray = () => {
    const rgbaObjKeyList = ["red", "green", "blue", "alpha"] as Rgba[];
    let errMsgArray: JSX.Element[] = [];
    rgbaObjKeyList.forEach((key) => {
      const color = key.replace(key[0], key[0].toUpperCase());
      const cssColor = color === "Alpha" ? "gray" : color;
      let valueSize: "min" | "max";
      for (valueSize in rgbaObj[key]) {
        const value = rgbaObj[key][valueSize];
        const text = valueSize === "min" ? "최솟값" : "최댓값";
        if (value === "") {
          errMsgArray.push(
            <p key={`${color}${valueSize}NoErr`}>
              <span style={{ color: cssColor }}>{color}</span>의 {text}이 없습니다.
            </p>
          );
        }
        if (value < 0) {
          errMsgArray.push(
            <p key={`${color}${valueSize}SmallErr`}>
              <span style={{ color: cssColor }}>{color}</span>의 {text}이 0보다 작습니다.
            </p>
          );
        }
        if (value > MAX_VALUE) {
          errMsgArray.push(
            <p key={`${color}${valueSize}BigErr`}>
              <span style={{ color: cssColor }}>{color}</span>의 {text}이 255보다 큽니다.
            </p>
          );
        }
      }
      if (rgbaObj[key].min > rgbaObj[key].max) {
        errMsgArray.push(
          <p key={`${color}minBigthanMaxErr`}>
            <span style={{ color: cssColor }}>{color}</span>의 최솟값이 <span style={{ color: cssColor }}>{color}</span>의 최댓값보다 큽니다.
          </p>
        );
      }
    });
    return errMsgArray;
  };
  const MySwal = withReactContent(Swal);
  const onGenerate = () => {
    const errMsgArray = makeErrMsgArray();
    if (errMsgArray.length !== 0) {
      MySwal.fire({
        icon: "error",
        html: <>{errMsgArray}</>,
      });
    } else {
      setIsGenerated(true);
    }
  };
  const onRandomClick = () => {
    let color: Rgba;
    for (color in rgbaObj) {
      const random1 = Math.floor(Math.random() * (MAX_VALUE - 1));
      const random2 = Math.floor(Math.random() * (MAX_VALUE - 1));
      if (random1 > random2) {
        dispatch(rgbaObjChange({ color, limit: "min", input: random2 }));
        dispatch(rgbaObjChange({ color, limit: "max", input: random1 }));
      } else {
        dispatch(rgbaObjChange({ color, limit: "min", input: random1 }));
        dispatch(rgbaObjChange({ color, limit: "max", input: random2 }));
      }
    }
    setTextLoad((textLoad) => !textLoad);
  };
  return (
    <section className="sm:mt-20 mt-10 flex flex-col items-center w-[640px] px-8 transition-all">
      <header className="w-[90%]">
        <h1 className="font-title sm:text-5xl text-4xl text-center break-keep transition-all">랜덤 색깔 마인크래프트 스킨 생성기</h1>
        <p className="font-bold text-center mt-3 sm:text-base text-[10px] text-gray-600 transition-all">랜덤한 색깔을 가진 마인크래프트 스킨을 만들어드립니다.</p>
        <p className="font-bold text-center sm:text-base text-[10px] text-gray-600 transition-all">0-255사이의 값을 입력해주세요.</p>
      </header>
      <div className="border-2 rounded-lg mt-4 mb-6 shadow-xl px-[3%] py-[1%] min-w-[230px] min-h-[207px] bg-white">
        <div className="grid grid-cols-colorForm items-center bg-slate-100 py-1 pl-2 h-1/5">
          <span>색</span>
          <span className="pl-2 col-span-2">최소값</span>
          <span className="pl-2 break-keep">최댓값</span>
        </div>
        {rgbaList.map((rgbaInfo) => (
          <RgbaForm key={rgbaInfo.color} rgbaInfo={rgbaInfo} onInputChange={onInputChange} rgbaObj={rgbaObj} textLoad={textLoad} />
        ))}
      </div>
      <div className="flex justify-evenly pb-5 w-full">
        <button onClick={onRandomClick} className="bg-blue-300 w-1/5 rounded-full transition-blue-btn py-1">
          <FontAwesomeIcon icon={faShuffle} />
        </button>
        <button onClick={onGenerate} className="bg-teal-300 w-3/5 rounded-full transition-teal-btn py-1">
          생성하기
        </button>
      </div>
    </section>
  );
}
export default Home;
