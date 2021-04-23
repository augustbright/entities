import { Vector } from '../common/types';
import { cloneEntity } from '../entity/funcs';
import { createFrame, Frame } from '../frame';
import { Operator } from './Base';
import {IOperatorInputData, IOperatorOutputData, ITickInput, ITickOutput} from './types';

interface ITransposeOperatorProps {
    propName: string,
    vector: Vector
    framesCount?: number
};

export class Transpose extends Operator<ITransposeOperatorProps> {    
    cachedFrame: Frame = createFrame([]);
    output(input: IOperatorInputData): IOperatorOutputData {
        this.cachedFrame = input.childDone ? this.cachedFrame : input.mergedFrame;
        const framesCount = this.props.framesCount || 30;
        const frameOffset = Math.min(framesCount, this.currentFrame);

        const move: Vector = {
            x: this.props.vector.x / framesCount * frameOffset,
            y: this.props.vector.y / framesCount * frameOffset
        };        

        return {
            frame: ({
                entities: this.cachedFrame.entities.map(
                    entity => entity.payload[this.props.propName] ? cloneEntity(entity, [], {
                        [this.props.propName]: {
                            x: entity.payload[this.props.propName].x + move.x,
                            y: entity.payload[this.props.propName].y + move.y
                        }
                    }) : entity
                )
            }),
            done: (this.currentFrame >= framesCount && input.childDone)
        };
    }
};
