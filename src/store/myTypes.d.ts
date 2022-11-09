type Rgba = "red" | "green" | "blue" | "alpha";
type RgbaList = Array<{
  displayName: "R" | "G" | "B" | "A";
  color: Rgba;
}>;
interface RgbaObj<T extends number | ""> {
  red: {
    min: T;
    max: T;
  };
  green: {
    min: T;
    max: T;
  };
  blue: {
    min: T;
    max: T;
  };
  alpha: {
    min: T;
    max: T;
  };
}
