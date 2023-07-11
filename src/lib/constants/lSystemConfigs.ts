import { LSystem } from '../lsystem/basic';

export const lSystemConfigs: {
	lSystem: LSystem;
	turtleConfig: { distance: number; angleIncrement: number };
	maxGens?: number;
}[] = [
	{
		lSystem: new LSystem('F', {
			F: 'F[+F]F[-F]F',
		}),
		turtleConfig: {
			distance: 1.5,
			angleIncrement: 25.7,
		},
	},
	{
		lSystem: new LSystem('F', {
			F: 'F[+F]F[-F][F]',
		}),
		turtleConfig: {
			distance: 5.5,
			angleIncrement: 20,
		},
	},
	{
		lSystem: new LSystem('F', {
			F: 'FF-[-F+F+F]+[+F-F-F]',
		}),
		turtleConfig: {
			distance: 6,
			angleIncrement: 22.5,
		},
		maxGens: 4,
	},
	{
		lSystem: new LSystem('X', {
			X: 'F[+X]F[-X]X',
			F: 'FF',
		}),
		turtleConfig: {
			distance: 1.5,
			angleIncrement: 20,
		},
		maxGens: 7,
	},
	{
		lSystem: new LSystem('X', {
			X: 'F[+X][-X]FX',
			F: 'FF',
		}),
		turtleConfig: {
			distance: 1.5,
			angleIncrement: 25.7,
		},
		maxGens: 7,
	},
	{
		lSystem: new LSystem('X', {
			X: 'F-[[X]+X]+F[+FX]-X',
			F: 'FF',
		}),
		turtleConfig: {
			distance: 4,
			angleIncrement: 22.5,
		},
	},
];
