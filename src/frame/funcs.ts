import { Entity } from "../entity"
import { Frame } from "./types"

export const createFrame = (entities: Array<Entity>): Frame => ({
    entities
});

export const mergeFrames = (frames: Array<Frame>): Frame => ({
    entities: frames.reduce((memo, frame) => [
        ...memo,
        ...frame.entities
    ], [] as Array<Entity>)
});
