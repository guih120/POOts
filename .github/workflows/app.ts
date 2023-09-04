import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
         return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
    user.id = crypto.randomUUID()
        this.users.push(user)
    
    }

   registerBike(bike:Bike): void{
     bike.id = crypto.randomUUID()
     this.bikes.push(bike)
   }

  rentBike(bikeId:string, userMail:string,startData:Date,endData:Date){
  const bike = this.bikes.find(b=>b.id===bikeId)
    if(!bike){
      throw new Error('Bike not found')
    }
  const user = this.users.find(u=>u.email===userMail)
    if(!user){
      throw new Error('Bike not found')
    }
    const newRent = Rent.create(this.rents,bike,user,startData,endData)
    this.rents.push(newRent)
  }
  
 removeUser(user: User): void { 
   let u=  (element:User) => element === user;
   let indice = this.users.findIndex(u)
   this.users.splice(indice,1)
}

   findRent(bike:Bike,user:User):Rent{
        return this.rents.find(x => x.user === user && x.bike === bike)
    }
   returnBike(bike_Id : string, userMail: string,retrive: Date): void{
     const bike = this.bikes.find(b=>b.id===bike_Id)
    if(!bike){
      throw new Error('Bike not found')
    }
  const user = this.users.find(u=>u.email===userMail)
    if(!user){
      throw new Error('Bike not found')
    }
        
        const aluga = this.findRent(bike,user)

        aluga.dateReturned = retrive
    }
}



