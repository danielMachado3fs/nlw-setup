import { Habit } from "./components/Habit";
import "./styles/app-all.css";

function App() {
    return (
        <div>
            <Habit completed={10} />
            <Habit completed={20} />
            <Habit completed={30} />
            <button>TESTE</button>
        </div>
    );
}

export default App;

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
