type Operation = (ctx: CanvasRenderingContext2D) => void;

export interface Operations {
	[predecessor: string]: Operation;
}

type X = number;
type Y = number;
type Heading = number;

export type State = [X, Y, Heading];
