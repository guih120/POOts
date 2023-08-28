import { cliente } from './cliente'

export class bike {
    numero: string
    disponivel: boolean
    dono: cliente

    constructor(numero: string, dono: cliente) {
        this.numero = numero
        this.disponivel = true
        this.dono = dono
    }

    aluguel(cliente: cliente, bike: bike): void {
        if (bike.disponivel == true) { this.dono = cliente; this.disponivel = false }
        else console.log('Bicleta indisponivel no momento')
    }
}