export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public hour: number,
        public avaible: boolean,
        public location: string,
        public id?: string
    ) {}
}
