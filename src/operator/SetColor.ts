import { Color } from '../common/types';
import { EntityPayload, EntityType } from '../entity';
import { cloneEntity, createEntity } from '../entity/funcs';
import {createFrame} from '../frame';
import { Operator } from './Base';
import {ITickInput, ITickOutput} from './types';

interface ISetColorOperatorProps {
    color: Color,
    for: Operator<any>
};

export class SetColor extends Operator<ISetColorOperatorProps> {
    tick(input: ITickInput): ITickOutput {
        const output = this.props.for.tick(input);
        return {
            frames: output.frames.map(frame => ({
                entities: frame.entities.map(entity => cloneEntity(entity, [], {
                    color: this.props.color
                }))
            })),
            done: true
        };
    }
};
