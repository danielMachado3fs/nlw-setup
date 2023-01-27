import dayjs from "dayjs";

export function generateDatesFromYearBiginning() {
    const primeiroDiaDoAno = dayjs().startOf("year");
    const diaAtual = new Date();

    const dates = [];
    let comparaData = primeiroDiaDoAno;

    while (comparaData.isBefore(diaAtual)) {
        dates.push(comparaData.toDate());
        comparaData = comparaData.add(1, "day");
    }
    return dates;
}
