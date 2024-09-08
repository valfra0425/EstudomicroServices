import { prismaClient } from "../../infra/database/prismaClient"
import { kafkaSendMenssager } from "../../infra/provider/kafka/producer"

// arquivo de serviço da criação de cliente

// type com os dados necessários para criar um cliente
type CreateClientRequest = {
    name: string,
    email: string,
    password: string,
    phone: string
}

// classe de criar cliente
export class CreateClientUseCase {
    constructor() {
    }

    async execute(data: CreateClientRequest) {

        // procura um cliente que já tem o email informado
        const customer = await prismaClient.client.findFirst({ where: { email: data.email } })

        // chamada de erro
        if (customer) throw new Error("customer already exists!")

        // criação do client no banco
        const createdCustomer = await prismaClient.client.create({
            data: {
                ...data
            }
        })

        // produção de um post no kafka para que seja consumida por outras apis
        const kafkaProducer = new kafkaSendMenssager();
        await kafkaProducer.execute('createClient', { email: createdCustomer.email, id: createdCustomer.id });

        // retorno com o cliente criado
        return createdCustomer;

    }
}