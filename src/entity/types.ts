export type EntityType = string;
export type EntityId = string;

export interface EntityPayload {
    [key: string]: any
};

export interface Entity {
    types: Array<EntityType>,
    id: EntityId,
    payload: EntityPayload
};
