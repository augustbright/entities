import { EntityPayload, EntityType } from '../entity';
import { createEntity } from '../entity/funcs';
import {createFrame} from '../frame';
import { Operator } from './Base';
import {IOperatorInputData, IOperatorOutputData, ITickInput, ITickOutput} from './types';

interface IEntityOperatorProps {
    types: Array<EntityType>,
    payload: EntityPayload
};

export class SpawnEntity extends Operator<IEntityOperatorProps> {
    output(input: IOperatorInputData): IOperatorOutputData {
        const entity = createEntity(
            this.props.types,
            this.props.payload
        );

        const frame = createFrame([entity]);

        return {
            frame,
            done: this.currentFrame > 1
        };
    }
};
