import { HabitDay } from "./components/HabitDay";
import { Header } from "./components/Header";
import { Summarytable } from "./components/SummaryTable";
import "./styles/app-all.css";

export function App() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
                <Header />
                <Summarytable />
            </div>
        </div>
    );
}

/**
 * Componente: Basicamente é um pedaço de código isolado que pode ser reaproveitado.
 * Propriedade: Uma informação enviada para modificar um componente visual ou comportamentalmente
 */

/**
 * Bibliotecas para css
 * ** postcss: automatizar tarefas dentro do css
 * ** tailwindcss: é um plugin para o postcss
 * ** autoprefixer: ferramenta para adicionar os prefixos de browser tipo webkit essas coisas.
 *
 * npm install -D tailwindcss postcss autoprefixe -> instala as bibliotecas
 * npx tailwindcss init -p -> inicia o tailwind e cria o arquivo do postcss para o vite reconhecer
 */
