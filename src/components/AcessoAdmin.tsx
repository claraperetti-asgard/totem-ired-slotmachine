import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import LogoIred from "../assets/ired/logo-ired-branco.png";
import type { GameSettings } from "../config/gameSettings";

type Props = {
    settings: GameSettings;
    onSave: (settings: GameSettings) => void;
    onClose: () => void;
};

const MIN_ATTEMPTS = 1;
const MAX_ATTEMPTS_LIMIT = 10;
const CHANCE_STEP = 5;

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

const trackStyle = (value: number, min: number, max: number) => {
    const percent = ((value - min) / (max - min)) * 100;

    return {
        background: `linear-gradient(to right, #ffffff ${percent}%, rgba(0,0,0,0.28) ${percent}%)`,
    };
};

export default function AcessoAdmin({ settings, onSave, onClose }: Props) {
    const [attempts, setAttempts] = useState(settings.maxAttempts);
    const [chance, setChance] = useState(Math.round(settings.winChance * 100));

    // não há botão Salvar: fechar no X grava o que estiver na tela
    const saveAndClose = () => {
        onSave({
            maxAttempts: attempts,
            winChance: chance / 100,
        });

        onClose();
    };

    return (
       
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-ired to-ired-deep text-white">
            <div className="flex min-h-full w-full flex-col items-center gap-8 px-8 py-10">
                {/* topo: fechar + logo, tudo no fluxo para rolar junto */}
                <div className="flex w-full max-w-3xl items-center justify-between gap-6">
                    <button
                        onClick={saveAndClose}
                        className="shrink-0 rounded-full border border-white/50 bg-white/15 p-3 transition-colors active:bg-white/30"
                    >
                        <X color="#ffffff" size="2.1875rem" />
                    </button>

                    <img
                        src={LogoIred}
                        alt="Ired"
                        className="w-44 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
                    />

                    {/* mesmo tamanho do X, para o logo ficar no centro */}
                    <span aria-hidden className="w-16 shrink-0" />
                </div>

                <div className="space-y-1 text-center">
                    <h1 className="text-5xl font-black italic uppercase tracking-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
                        <span className="text-white">Painel do </span>
                        <span className="ired-tag">
                            Administrador
                        </span>
                    </h1>
                    <p className="text-xl text-white/60">
                        Configurações da Slot Machine
                    </p>
                </div>

                <div className="w-full max-w-3xl space-y-8 rounded-3xl border border-white/35 bg-gradient-to-b from-ired-dark to-ired-deep p-8 shadow-[0_30px_70px_rgba(0,0,0,0.55),inset_0_2px_0_rgba(255,255,255,0.12)]">
                    {/* ---------- TENTATIVAS ---------- */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-bold">
                                    Tentativas por pessoa
                                </h2>
                                <p className="text-lg text-white/60">
                                    Quantos giros cada participante pode dar.
                                </p>
                            </div>

                            <span className="text-5xl font-black italic leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                                {attempts}
                            </span>
                        </div>

                        <div className="flex items-center gap-5">
                            <button
                                onClick={() =>
                                    setAttempts((v) =>
                                        clamp(v - 1, MIN_ATTEMPTS, MAX_ATTEMPTS_LIMIT)
                                    )
                                }
                                className="shrink-0 rounded-full border border-white/20 bg-white/10 p-4 active:bg-white/30"
                            >
                                <Minus color="#ffffff" size="1.875rem" />
                            </button>

                            <input
                                type="range"
                                className="slot-range"
                                min={MIN_ATTEMPTS}
                                max={MAX_ATTEMPTS_LIMIT}
                                step={1}
                                value={attempts}
                                onChange={(e) => setAttempts(Number(e.target.value))}
                                style={trackStyle(
                                    attempts,
                                    MIN_ATTEMPTS,
                                    MAX_ATTEMPTS_LIMIT
                                )}
                            />

                            <button
                                onClick={() =>
                                    setAttempts((v) =>
                                        clamp(v + 1, MIN_ATTEMPTS, MAX_ATTEMPTS_LIMIT)
                                    )
                                }
                                className="shrink-0 rounded-full border border-white/20 bg-white/10 p-4 active:bg-white/30"
                            >
                                <Plus color="#ffffff" size="1.875rem" />
                            </button>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* ---------- CHANCE DE GANHAR ---------- */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-bold">Chance de ganhar</h2>
                                <p className="text-lg text-white/60">
                                    Chance de acertar 3 figuras iguais em cada giro.
                                </p>
                            </div>

                            <span className="text-5xl font-black italic leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                                {chance}%
                            </span>
                        </div>

                        <div className="flex items-center gap-5">
                            <button
                                onClick={() =>
                                    setChance((v) => clamp(v - CHANCE_STEP, 0, 100))
                                }
                                className="shrink-0 rounded-full border border-white/20 bg-white/10 p-4 active:bg-white/30"
                            >
                                <Minus color="#ffffff" size="1.875rem" />
                            </button>

                            <input
                                type="range"
                                className="slot-range"
                                min={0}
                                max={100}
                                step={CHANCE_STEP}
                                value={chance}
                                onChange={(e) => setChance(Number(e.target.value))}
                                style={trackStyle(chance, 0, 100)}
                            />

                            <button
                                onClick={() =>
                                    setChance((v) => clamp(v + CHANCE_STEP, 0, 100))
                                }
                                className="shrink-0 rounded-full border border-white/20 bg-white/10 p-4 active:bg-white/30"
                            >
                                <Plus color="#ffffff" size="1.875rem" />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-lg text-white/40">
                    As configurações são salvas ao fechar no X.
                </p>
            </div>
        </div>
    );
}
