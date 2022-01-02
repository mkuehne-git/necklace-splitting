// https://stackoverflow.com/questions/48741570/how-can-i-import-glsl-as-string-in-typescript
declare module "*.glsl" {
  const value: string;
  export default value;
}
