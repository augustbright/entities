import React from 'react';
import { Frame } from '../../frame';
import { Operator } from '../../operator/Base';

interface SceneProps {
    operator: Operator<any>
}

interface SceneState {
    frames: Array<Frame>
    currentFrame: number
}

export class Scene extends React.Component<SceneProps, SceneState> {
    canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: SceneProps) {
        super(props);
        const {frame} = props.operator.tick({});
        const frames = frame ? [frame] : [];

        this.state = {
            frames,
            currentFrame: 0
        };

        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        this.repaintCanvas();
    }

    onClickNext = () => {
        if (this.state.currentFrame < this.state.frames.length - 1) {
            this.setState((currentState) => ({
                currentFrame: currentState.currentFrame + 1
            }));
        }

        const {done, frame} = this.props.operator.tick({});
        if (done) {
            return;
        }
        if (frame) {
            this.setState(currentState => ({
                frames: [...currentState.frames, frame],
                currentFrame: currentState.currentFrame + 1
            }));
        }
    }

    onClickPrevious = () => {
        this.setState(currentState => ({
            currentFrame: Math.max(0, currentState.currentFrame - 1)
        }));
    }

    componentDidUpdate() {
        this.repaintCanvas();
    }

    getCurrentFrame(): Frame {
        return this.state.frames[this.state.currentFrame];
    }

    clearCanvas() {
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    repaintCanvas() {
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // this.clearCanvas();

        const frame = this.getCurrentFrame();
        frame.entities.forEach(entity => {
            if (entity.types.includes('dot')) {
                ctx.fillRect(
                    entity.payload.position.x,
                    entity.payload.position.y,
                    1,
                    1
                )
            }
        });

        setTimeout(() => {
            this.onClickNext();
        }, 1);
    }

    render() {
        const frame = this.getCurrentFrame();
        return (
            <div>
                <button onClick={this.onClickPrevious}>PREV</button>
                <button onClick={this.onClickNext}>NEXT</button>
                <canvas ref={this.canvasRef} width="600" height="600"></canvas>
                <pre>
                    {JSON.stringify(frame, null, 4)}
                </pre>
            </div>
        );
    }
}