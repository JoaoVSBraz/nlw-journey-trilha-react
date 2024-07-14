import { CircleDashed, UserCog } from "lucide-react";
import Button from "../../components/Button";

export default function Guests() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Jessica White</span>
                        <span className="block text-xs text-zinc-400 truncate">jessica.white44@yahoo.com</span>
                    </div>
                    <CircleDashed className="size-5 text-zinc-400 flex-shrink-0" />
                </div>
            </div>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Dr. Rita Pacocha</span>
                        <span className="block text-xs text-zinc-400 truncate">lacy.stiedemann@gmail.com</span>
                    </div>
                    <CircleDashed className="size-5 text-zinc-400 flex-shrink-0" />
                </div>
            </div>            
            <Button variant="secondary" size="full">
                <UserCog className="size-5" />
                Gerenciar convidados
            </Button>
        </div>
    )
}