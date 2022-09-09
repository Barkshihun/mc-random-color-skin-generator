type Rgba = "red" | "green" | "blue" | "alpha";
type RgbaList = Array<{
  displayName: string;
  color: Rgba;
}>;
interface RgbaObj {
  red: {
    min: "" | number;
    max: "" | number;
  };
  green: {
    min: "" | number;
    max: "" | number;
  };
  blue: {
    min: "" | number;
    max: "" | number;
  };
  alpha: {
    min: "" | number;
    max: "" | number;
  };
}
