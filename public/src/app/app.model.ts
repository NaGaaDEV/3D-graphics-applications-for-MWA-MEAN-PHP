export class App {
    _id!:string;
    name!: string;
    initialReleaseDate!: Date;
    logo!: string;
    movies!: Movie[];
}

export class Movie {
    _id!: string;
    title!: string;
    trailer!: string;
}
