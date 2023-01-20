import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const firstHabitId = "0730ffac-d039-4194-9571-01aa2aa0efbd";
const firstHabitCreationDate = new Date("2022-12-31T03:00:00.000");

const secondHabitId = "00880d75-a933-4fef-94ab-e05744435297";
const secondHabitCreationDate = new Date("2023-01-03T03:00:00.000");

const thirdHabitId = "fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00";
const thirdHabitCreationDate = new Date("2023-01-08T03:00:00.000");

async function run() {
    /**
     * Deleta os dados existentes nas tabelas Habit e Day
     */
    await prisma.habit.deleteMany();
    await prisma.day.deleteMany();

    /**
     * Create habits
     */
    await Promise.all([
        prisma.habit.create({
            data: {
                id: firstHabitId,
                title: "Beber 2L água",
                created_at: firstHabitCreationDate,
                weekDays: {
                    //dias que o hábito estará disponível (relação com a tabela weekDays)
                    create: [{ week_day: 1 }, { week_day: 2 }, { week_day: 3 }],
                },
            },
        }),

        prisma.habit.create({
            data: {
                id: secondHabitId,
                title: "Exercitar",
                created_at: secondHabitCreationDate,
                weekDays: {
                    create: [{ week_day: 3 }, { week_day: 4 }, { week_day: 5 }],
                },
            },
        }),

        prisma.habit.create({
            data: {
                id: thirdHabitId,
                title: "Dormir 8h",
                created_at: thirdHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 },
                    ],
                },
            },
        }),
    ]);

    await Promise.all([
        /**
         * DIAS QUE OS HÁBITOS FORAM COMPLETADOS
         * OS HÁBITOS SÓ ESTÃO DISPONÍVEIS APÓS A DATA DE CRIAÇÃO, OU SEJA, NA SEGUNDA FEIRA
         * DIA 02/01 SÓ TINHA 1 HÁBITO CRIADO, SENDO ASSIM FOI COMPLETADO 1/1 HÁBITO POR QUE
         * MESMO O HÁBITO DORMIR 8HRS TAMBÉM ESTEJA DISPONÍVEL NA SEGUNDA, ELE SÓ FOI CRIADO
         * NO DIA 08/01
         *
         * Habits (Complete/Available): 1/1
         */
        prisma.day.create({
            data: {
                /** Monday */
                date: new Date("2023-01-02T03:00:00.000z"),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    },
                },
            },
        }),

        /**
         * Habits (Complete/Available): 1/1
         */
        prisma.day.create({
            data: {
                /** Friday */
                date: new Date("2023-01-06T03:00:00.000z"),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId,
                    },
                },
            },
        }),

        /**
         * Habits (Complete/Available): 2/2
         */
        prisma.day.create({
            data: {
                /** Wednesday */
                date: new Date("2023-01-04T03:00:00.000z"),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId },
                    ],
                },
            },
        }),
    ]);
}

run()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        //@ts-ignore
        process.exit(1);
    });
