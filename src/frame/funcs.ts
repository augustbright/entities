import { Entity } from "../entity"
import { Frame } from "./types"

export const createFrame = (entities: Array<Entity>): Frame => ({
    entities
});
