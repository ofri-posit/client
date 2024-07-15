export class Member {
    id: number;
    name: string;
    email: string;
    last_workout_time: Date;

    constructor() {
        this.id = -1;
        this.name = "";
        this.email = "";
        this.last_workout_time = new Date();

    }

    staticGetFormattedLastWorkoutTime(): string {
        return this.last_workout_time.toLocaleDateString() + " " + this.last_workout_time.toLocaleTimeString();
    }





}