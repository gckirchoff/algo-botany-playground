export interface Productions {
	[predecessor: string]: string;
}

export class LSystem {
	private axiom: string;
	private productions: Productions;

	constructor(axiom: string, productions: Productions) {
		this.axiom = axiom;
		this.productions = productions;
	}

	getStringAtGeneration = (generation: number): string => {
		let currentRules = this.axiom;
		for (let i = 0; i < generation; i++) {
			const nextGen = this.buildNextGen(currentRules);
			currentRules = nextGen;
		}
		return currentRules;
	};

	private buildNextGen = (currentRules: string): string =>
		currentRules.split('').reduce((acc: string, char) => {
			const successor = this.productions[char];
			acc += successor ?? char;
			return acc;
		}, '');
}
