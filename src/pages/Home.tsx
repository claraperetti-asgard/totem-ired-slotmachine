import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Settings } from "lucide-react";
import LogoIred from "../assets/ired/logo-ired-branco.png";
import { Fundo, Rodape } from "../components/Marca";
import AcessoAdmin from "../components/AcessoAdmin";
import SlotMachineDemo from "../components/SlotMachineDemo";
import LoginAdmin from "../components/LoginAdmin";
import {
    loadGameSettings,
    saveGameSettings,
    type GameSettings,
} from "../config/gameSettings";


export default function Home() {
    const [settings, setSettings] = useState<GameSettings>(() =>
        loadGameSettings(),
    );

    const [adminOpen, setAdminOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden text-white">
            <Fundo />


            <div className="relative z-10 flex min-h-screen flex-col items-center gap-10 px-6 pt-15 pb-10">
                <header className="flex w-full max-w-5xl flex-col items-center px-8">
                    <img
                        src={LogoIred}
                        alt="Ired"
                        className="w-80 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
                    />
                </header>

                <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
                    <h1 className="text-8xl font-bold italic uppercase tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]">
                        <span className="text-white">Slot </span>
                        <span className="ired-tag">
                            Machine
                        </span>
                    </h1>

                    <p className=" mb-9 text-5xl font-black italic uppercase leading-tight tracking-tight">
                        <span className="text-white">Gire</span>
                        <span className="text-white"> e ganhe um </span>
                        <span className="text-white">brinde</span>
                    </p>

                    {/* vitrine: gira sozinha, sem interação nenhuma */}
                    <SlotMachineDemo />

                    <NavLink
                        to="/avalie"
                        className="group relative flex items-center justify-center"
                    >
                        {/* halo pulsando atrás do botão */}
                        <span
                            className="absolute -inset-6 rounded-full bg-white/30 blur-2xl"
                            style={{ animation: "jackpot-glow 2s ease-in-out infinite" }}
                        />

                        {/* pílula com seta redonda, como o "Saiba mais" do site */}
                        <span className="relative mt-9 flex items-center gap-8 rounded-full bg-gradient-to-b from-white to-[#f3e1e1] py-3 pl-16 pr-3 text-4xl font-black italic uppercase tracking-widest text-ired shadow-[0_16px_40px_rgba(0,0,0,0.35),inset_0_-3px_0_rgba(189,0,0,0.12)] transition-transform duration-200 group-active:scale-95">
                            Iniciar
                            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ired shadow-[0_6px_16px_rgba(189,0,0,0.45)]">
                                <ArrowRight size="2.5rem" color="#ffffff" strokeWidth={3} />
                            </span>
                        </span>
                    </NavLink>

                    <div className="flex items-center gap-3 text-white/60">
                        <span className="h-2 w-2 rounded-full bg-[#ffffff] shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
                        <span className="text-2xl  font-semibold tracking-[0.25em] uppercase">
                            Toque para começar
                        </span>
                        <span className="h-2 w-2 rounded-full bg-[#ffffff] shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
                    </div>
                </div>

                <Rodape />
            </div>

            <button
                onClick={() => setLoginOpen(true)}
                aria-label="Configurações"
                className="fixed bottom-8 right-8 z-30 rounded-full border border-white/50 bg-white/15 p-4 text-white backdrop-blur-sm transition-colors active:bg-white/30"
            >
                <Settings size="2.125rem" />
            </button>

            {/* ---------- LOGIN ---------- */}
            {loginOpen && (
                <LoginAdmin
                    onSuccess={() => {
                        setLoginOpen(false);
                        setAdminOpen(true);
                    }}
                    onClose={() => setLoginOpen(false)}
                />
            )}

            {/* ---------- PAINEL ADMIN ---------- */}
            {adminOpen && (
                <AcessoAdmin
                    settings={settings}
                    onSave={(next) => setSettings(saveGameSettings(next))}
                    onClose={() => setAdminOpen(false)}
                />
            )}
        </div>
    );
}

