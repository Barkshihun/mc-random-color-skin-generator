interface rgbaList {
  name: String;
  minId: "rMin" | "gMin" | "bMin" | "aMin";
  maxId: "rMax" | "gMax" | "bMax" | "aMax";
}
interface rgbaObjState {
  rMin: "" | number;
  rMax: "" | number;
  gMin: "" | number;
  gMax: "" | number;
  bMin: "" | number;
  bMax: "" | number;
  aMin: "" | number;
  aMax: "" | number;
}
type rgbaId = "rMin" | "gMin" | "bMin" | "aMin" | "rMax" | "gMax" | "bMax" | "aMax";
