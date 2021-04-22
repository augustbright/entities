import { EntityPayload, EntityType } from '../entity';
import { createEntity } from '../entity/funcs';
import {createFrame} from '../frame';
import { Operator } from './Base';
import {ITickInput, ITickOutput} from './types';

interface IEntityOperatorProps {
    types: Array<EntityType>,
    payload: EntityPayload
};

export class SpawnEntity extends Operator<IEntityOperatorProps> {
    tick(input: ITickInput): ITickOutput {
        const entity = createEntity(
            this.props.types,
            this.props.payload
        );

        const frame = createFrame([entity]);

        return {
            frames: [frame],
            done: true
        };
    }
};
