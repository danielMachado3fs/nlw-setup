interface Props {
    completed: number;
}
export function Habit(props: Props) {
    return (
        <div className="bg-slate-200 w-10 h-10 text-black font-bold rounded m-2 flex justify-center items-center">
            {props.completed}
        </div>
    );
}
