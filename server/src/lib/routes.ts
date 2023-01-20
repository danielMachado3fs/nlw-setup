import { FastifyInstance } from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";
import dayjs from "dayjs";
/**
 * separando as rotas em um arquivo, essa função que está sendo exportada será passada
 * como parâmetro para o register do fastify, ou seja, ela é um middleware que contem as
 * rodas que podem consumir a api e é liberada pelo register.
 *
 * OBS: toda função que será passada como parâmetro para o register do fastify
 * deve ser asincrona.
 *  */

export async function appRoutes(app: FastifyInstance) {
    //criar hábitos
    app.post("/habits", async (request) => {
        //zod é uma biblioteca para tipar os dados recebidos no request,
        //ou seja, validar os parâmetros
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6) //array de números com min 0 e max 6
            ),
        });

        //utilizando o validador createHabitBody criado acima
        const { title, weekDays } = createHabitBody.parse(request.body);

        //criar data com o horário 00:00:00
        const today = dayjs().startOf("day").toDate();

        await prisma.habit.create({
            data: {
                title: title,
                created_at: today,
                weekDays: {
                    create: weekDays.map((wd) => {
                        return {
                            week_day: wd,
                        };
                    }),
                },
            },
        });

        return await prisma.habit.findMany();
    });

    app.get("/day", async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date(), //os parametros vem como string, a funcao coerce serve para converter
        });
        const { date } = getDayParams.parse(request.query);
        const weekDay = dayjs(date).get("day"); //pegar dia da semana

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    },
                },
            },
        });

        return possibleHabits;
    });
}
