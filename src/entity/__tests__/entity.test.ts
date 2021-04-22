import {
    createEntity,
    generateEntityId,
    cloneEntity
} from '../funcs';

describe('Entities', () => {
    describe('generateEntityId', () => {
        it('should generate entity id', () => {
            expect(typeof generateEntityId()).toBe('string');
        });

        it('should generate unique entity id', () => {
            expect(generateEntityId()).not.toEqual(generateEntityId());
        });
    });
    describe('createEntity', () => {
        it('should create entity', () => {
            expect(typeof createEntity([], {})).toBe('object');
        });
        it('should pass types and payload and generate id', () => {
            const entity = createEntity(['type1', 'type2'], {
                key1: 'value1',
                key2: 'value2'
            });
            expect(entity.payload).toEqual({
                key1: 'value1',
                key2: 'value2'
            });
            expect(entity.types).toEqual(['type1', 'type2']);
            expect(typeof entity.id).toBe('string');
        });
    });
    describe('cloneEntity', () => {
        it('should clone entity and mix types and payload', () => {
            const entity = createEntity(['type1', 'type2'], {
                key1: 'value1',
                key2: 'value2'
            });
            const clonedEntity = cloneEntity(entity, ['mixedType'], {
                mixedKey: 'mixedValue'
            });

            expect(clonedEntity.payload).toEqual({
                key1: 'value1',
                key2: 'value2',
                mixedKey: 'mixedValue'
            });

            expect(clonedEntity.types).toEqual(['type1', 'type2', 'mixedType']);
            expect(clonedEntity.id).toEqual(entity.id);
        });
    });
});
