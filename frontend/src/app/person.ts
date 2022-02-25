//General interfaces to define what values a person in the App-person-card could possibly have.
// This is used to specify types in some classes in the project, but there are multiple implementations currently that use "Any" rather than "Person" in their code.


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


