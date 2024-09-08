import { Router } from "express";
import { createProductController } from "../modules/createProduct/createProduct.controller";

const router = Router();

router.post("/product", (request, response) => {
    new createProductController().handle(request, response)
});

export { router }