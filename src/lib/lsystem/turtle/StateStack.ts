import type { State } from './types';

export class StateStack {
	private stack: State[] = [];

	constructor(initialState: State) {
		this.pushState(initialState);
	}

	pushState = (state: State) => this.stack.push(state);

	popState = (): State | undefined => this.stack.pop();

	peak = (): State | undefined => this.stack.at(-1);
}
