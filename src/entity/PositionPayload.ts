import { Vector } from '../common/types';
import {EntityPayload} from './types';

export interface PositionPayload extends EntityPayload {
    position: Vector
}
