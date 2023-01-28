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
    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day"); //pegar dia da semana

    //todos os  hábitos possiveis
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

    //habitos que ja foram completados
    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => {
      return dayHabit.id;
    });

    return {
      possibleHabits,
      completedHabits,
    };
  });

  //completa e descompleta hábito (vincula e remove vinculo do hábito com a data)
  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });
    const { id } = toggleHabitParams.parse(request.params);
    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    //se não houver uma data na tabela day, cria essa data para vincular o hábito completado
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    //verifica se o hábito ja está marcado
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });
    console.log(day);
    console.log(id);

    if (dayHabit) {
      //desmarca o hábito no dia
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      //completa o habito no dia
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
        SELECT
            D.id,
            D.date,
            (
                SELECT
                    cast(count(*) as float)
                FROM day_habits DH
                WHERE DH.day_id = D.id
            ) as completed,
            (
                SELECT
                    cast(count(*) as float)
                FROM habit_week_days HWD
                JOIN habits H
                    ON H.id = HWD.habit_id
                WHERE
                    HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                    AND H.created_at <= D.date
            ) as amout
            FROM days D
    `;

    return summary;
  });
}
