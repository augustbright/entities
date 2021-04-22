import {uniq} from 'lodash';
import {
    Entity,
    EntityPayload,
    EntityType,
    EntityId
} from './types';

export const generateEntityId = (function() {
    let id = 0;
    return (): EntityId => {
        id += 1;
        return String(`entity-${id}`);
    };
})();

export const createEntity = (types: Array<EntityType>, payload: EntityPayload): Entity => ({
    id: generateEntityId(),
    types,
    payload
});

export const cloneEntity = (entity: Entity, mixTypes: Array<EntityType>, mixPayload: Partial<EntityPayload>): Entity => ({
    id: entity.id,
    types: uniq([...entity.types, ...mixTypes]),
    payload: {
        ...entity.payload,
        ...mixPayload
    }
});
