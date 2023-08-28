import { cliente } from './cliente'
import { bike } from './bike'

const joao = new cliente('Joao da Silva', '111222333-45')
const bicicleta = new bike('123-45', joao)
const daniel = new cliente('Daniel Borges', '123123123-44')

bicicleta.aluguel(joao, bicicleta)

bicicleta.aluguel(daniel, bicicleta)

console.log(bicicleta.dono)


