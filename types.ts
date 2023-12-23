export type Client = {
    id: string;
    name: string;
    email: string;
    cards: Card[];
    travels: Array<Omit<Travel, 'client'>>;
};

export type ClientApi = {
    id: string;
    name: string;
    email: string;
    cards: Card[];
    travels: string[];
};

export type Card = {
    number: string;
    cvv: number;
    expirity: string;
    money: number;
};

export type Driver = {
    id: string;
    name: string;
    email: string;
    username: string;
    travels: Array<Omit<Travel, 'driver'>>;
};

export type DriverApi = {
    id: string;
    name: string;
    email: string;
    username: string;
    travels: string[];
};

export type Travel = {
    id: string;
    client: Omit<Client, 'travels'> | null;
    driver: Omit<Driver, 'travels'> | null;
    money: number;
    distance: number;
    date: string;
    status: Status;
}; 

export type TravelApi = {
    id: string;
    client: string | null;
    driver: string | null;
    money: number;
    distance: number;
    date: string;
    status: Status;
};

export enum Status {
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
}