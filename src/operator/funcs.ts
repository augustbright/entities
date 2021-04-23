import { createFrame, Frame, mergeFrames } from "../frame";
import { ITickOutput } from "./types";

export const reduceOperatorInputToFrame = (output: Array<ITickOutput>): Frame =>
    mergeFrames(output
        .filter(({done}) => !done)
        .map(({frame}) => frame || createFrame([])));
