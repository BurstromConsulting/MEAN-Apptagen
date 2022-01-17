export interface Person {
    id: string;
    _id: string;
    name: string;
    title: string;
    status: Status;
    roles: string[];
}
export interface Availability{
    _id: any;
    status: string;
    color: string;
}
export interface Status{
    message: string;
    availability: Availability;
}

enum Color {
    Red = "#920C0C",
    Blue = "#07005C",
    Green = "#006A22",
    Yellow = "#E5BF00",
}

export const statuscolor = [
    Color.Red, Color.Blue, Color.Green, Color.Yellow
];

