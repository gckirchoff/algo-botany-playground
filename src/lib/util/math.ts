export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const toDegrees = (rads: number): number => (rads * 180) / Math.PI;

export class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	getNextPointWithPolarCoords = (radius: number, angle: number): Vector => {
		const rads = toRadians(angle);
		const nextX = this.x + radius * Math.cos(rads);
		const nextY = this.y - radius * Math.sin(rads);
		return new Vector(nextX, nextY);
	};
}
