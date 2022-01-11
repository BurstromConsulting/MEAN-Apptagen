export interface People {
    id: number;
    name: string;
    status: number;
    title: string;
    color: string;
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

export const employees:People[] = [
    {
        id: 1,
        name: 'Johan Burström',
        status: 0,
        title: 'Utvecklare / Team Lead @Burström Consulting',
        color: statuscolor[0],
    },
    {
        id: 2,
        name: 'Dennis Pettersson',
        status: 2,
        title: 'Kontorets Träl',
        color: statuscolor[2],
    },
    {
        id: 3,
        name: 'Jimmie Van Eijdsen',
        status: 3,
        title: 'Bolagsägare @Jaam Development',
        color: statuscolor[3],
    }

]
