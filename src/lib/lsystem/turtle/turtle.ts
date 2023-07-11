import { Vector } from '../../util/math';
import { StateStack } from './StateStack';
import type { Operations, State } from './types';

export class Turtle {
	private heading: number = 90;
	private stateStack: StateStack;

	private distance: number;
	private angleIncrement: number;
	private canvasWidth: number;
	private canvasHeight: number;
	private position: Vector;

	private operations: Operations;

	constructor(distance: number, angleIncrement: number, canvasWidth: number, canvasHeight: number) {
		this.distance = distance;
		this.angleIncrement = angleIncrement;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.position = new Vector(canvasWidth * 0.5, canvasHeight);
		this.stateStack = new StateStack([canvasWidth * 0.5, canvasHeight, this.heading]);

		this.operations = {
			F: (ctx) => {
				const { x, y } = this.position.getNextPointWithPolarCoords(this.distance, this.heading);
				ctx.lineTo(x, y);
				this.setState([x, y, this.heading]);
			},
			f: (ctx) => {
				const { x, y } = this.position.getNextPointWithPolarCoords(this.distance, this.heading);
				ctx.moveTo(x, y);
				this.setState([x, y, this.heading]);
			},
			'+': () => (this.heading += this.angleIncrement),
			'-': () => (this.heading -= this.angleIncrement),
			'[': () => this.stateStack.pushState([this.position.x, this.position.y, this.heading]),
			']': (ctx) => {
				const poppedState = this.stateStack.popState();
				if (!poppedState) {
					return;
				}
				const [x, y] = poppedState;
				ctx.moveTo(x, y);
				this.setState(poppedState);
			},
		};
	}

	march = (rules: string, ctx: CanvasRenderingContext2D) => {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y);
		rules.split('').forEach((char) => {
			if (!(char in this.operations)) {
				return;
			}
			this.operations[char](ctx);
		});
		ctx.stroke();
		ctx.restore();
		this.resetState();
	};

	private setState = ([x, y, heading]: State): void => {
		this.position = new Vector(x, y);
		this.heading = heading;
	};

	private resetState = (): void => {
		this.position = new Vector(this.canvasWidth * 0.5, this.canvasHeight);
		this.heading = 90;
		this.stateStack = new StateStack([this.position.x, this.position.y, this.heading]);
	};
}
