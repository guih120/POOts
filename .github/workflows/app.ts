import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }

    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string) {
        const today = new Date()
        const rent = this.rents.find(rent =>
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            return
        }
        throw new Error('Rent not found.')
    }

    listUsers(): void {
        console.log("Lista de Usuários:");
        this.users.forEach(user => {
            console.log(`ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
        });
    }

    listRents(): void {
        console.log("Lista de Reservas/Aluguéis:");
        this.rents.forEach(rent => {
            console.log(`Usuário: ${rent.user.name}, Bicicleta: ${rent.bike.name}`);
            console.log(`Data de Início: ${rent.dateFrom}, Data de Término: ${rent.dateTo}`);
            if (rent.dateReturned) {
                console.log(`Data de Devolução: ${rent.dateReturned}`);
            }

        });
    }

    listBikes(): void {
        console.log("Lista de Bicicletas:");
        this.bikes.forEach(bike => {
            console.log(`ID: ${bike.id}, Nome: ${bike.name}, Tipo: ${bike.type}`)
        });
    }

    authenticateUser(userId: string, password: string): boolean {
        const user = this.users.find(user => user.id === userId);

        if (user) {
            if (user.password === password) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}




