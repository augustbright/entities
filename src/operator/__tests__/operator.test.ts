import { EntityType } from '../../entity';
import { SetColor } from '../SetColor';
import {SpawnEntity} from '../SpawnEntity';

describe('Operators', () => {
    describe('SpawnEntity', () => {
        it('should create a frame with described entity and finish', () => {
            const operator = new SpawnEntity({
                types: [EntityType.Dot],
                payload: {
                    position: {
                        x: 10,
                        y: 10
                    }
                }
            });
            const tickOutput = operator.tick({});
            expect(tickOutput.frame.entities.length).toBe(1);
            expect(tickOutput.frame.entities[0]).toEqual({
                id: tickOutput.frame.entities[0].id,
                payload: {
                    position: {
                        x: 10,
                        y: 10
                    }
                },
                types: [EntityType.Dot]
            });
            expect(tickOutput.done).toBe(true);
        });
    });

    describe('SetColor', () => {
        it('should set color property for child operator output', () => {
            const operator = new SetColor({
                color: {
                    R: 10,
                    G: 20,
                    B: 30
                }
            }, [
                new SpawnEntity({
                    types: [EntityType.Dot],
                    payload: {
                        position: {
                            x: 10,
                            y: 10
                        }
                    }
                })
            ]);
            const tickOutput = operator.tick({});
            expect(tickOutput.frame.entities[0].payload).toEqual({
                position: {
                    x: 10,
                    y: 10,
                },
                color: {
                    R: 10,
                    G: 20,
                    B: 30
                }
            })
        });
    });
});
