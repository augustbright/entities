export type VectorComponent = number;

export interface Vector2 {
    x: VectorComponent,
    y: VectorComponent
}
export interface Vector extends Vector2 {};

export type Color = {
    R: number,
    G: number,
    B: number
};