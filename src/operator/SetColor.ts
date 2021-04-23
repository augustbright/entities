import { Color } from '../common/types';
import { cloneEntity } from '../entity/funcs';
import { Operator } from './Base';
import { IOperatorInputData, IOperatorOutputData } from './types';

interface ISetColorOperatorProps {
    color: Color
};

export class SetColor extends Operator<ISetColorOperatorProps> {
    output(input: IOperatorInputData): IOperatorOutputData {
        return {
            frame: {
                entities: input.mergedFrame.entities.map(
                    entity => cloneEntity(entity, [], {
                        color: this.props.color
                    })
                )
            },
            done: input.childDone
        };
    }
};
