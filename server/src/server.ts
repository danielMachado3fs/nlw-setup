import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const app = Fastify();
const prisma = new PrismaClient();

//Define quais aplicações poderão consumir os dados dessa api. Podemos definir a url do
//frontend por exemplo http://localhost:8080
//O método recomendado para adicionar middlewares ao fastify é o REGISTER
app.register(cors, {
    //configurações de acesso a api
});

app.get("/", async () => {
    const habits = await prisma.habit.findMany();
    return habits;
});

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server Running...");
});
