import { prismaClient } from "../../infra/database/prismaClient"
import { kafkaSendMenssager } from "../../infra/provider/kafka/producer";

// arquivo de serviço da criação de product

// type com os dados necessários para criar um produto
type createProductRequest = {
    name: string,
    code: string,
    quantity: number,
    price: number
}

// classe de criar produtos
export class CreateProductUseCase {
    constructor() {

    }

    async execute(data: createProductRequest) {

        // procura um o produto que tenha o mesmo id do produto que vai ser criado
        const product = await prismaClient.product.findFirst({ where: { code: data.code } });

        // se já ouver um com o mesmo id retorna erro
        if (product) throw new Error("product code already exists!");

        // cria produto no banco
        const createdProduct = await prismaClient.product.create({ data: { ...data } });

        // cria tópico no kafka
        const kafkaProducer = new kafkaSendMenssager();
        await kafkaProducer.execute("createProduct", { externalId: createdProduct.id, code: createdProduct.code });

        // retorno do produto criado
        return createdProduct;
    }

}