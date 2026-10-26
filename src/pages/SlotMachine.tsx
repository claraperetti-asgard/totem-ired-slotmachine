import { useRef, useState } from "react";
import { ArrowLeft, RotateCw } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoIred from "../assets/ired/logo-ired-branco.png";
import { Fundo, Rodape } from "../components/Marca";
import PrizeCard from "../components/PrizeCard";
import { PRIZES } from "../config/prizes";
import { loadGameSettings, type GameSettings } from "../config/gameSettings";

// medidas em rem para acompanharem a escala do totem (ver index.css)
const CELL = 15;
const REEL_W = 16.25;
const REPEATS = 14;

const symbols = PRIZES;

const L = symbols.length;

const STRIP = Array.from({ length: REPEATS * L }, (_, i) => symbols[i % L]);

const centerPos = (t: number) => (t - 1 + L) % L;

const SPIN_MS = [2200, 2800, 3400];

export default function SlotMachine() {
    const [settings] = useState<GameSettings>(() => loadGameSettings());
    const MAX_ATTEMPTS = settings.maxAttempts;
    const WIN_CHANCE = settings.winChance;

    const [positions, setPositions] = useState([
        centerPos(0),
        centerPos(1),
        centerPos(2),
    ]);
    const [snap, setSnap] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [won, setWon] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const posRef = useRef(positions);
    const navigate = useNavigate();

    const getRandomSymbol = () => Math.floor(Math.random() * L);

    const drawResult = () => {
        if (Math.random() < WIN_CHANCE) {
            // ganhou: qualquer figura vale o mesmo brinde
            const s = getRandomSymbol();
            return [s, s, s];
        }

        const a = getRandomSymbol();
        const b = getRandomSymbol();
        let c = getRandomSymbol();

        if (a === b && b === c) {
            c = (c + 1 + Math.floor(Math.random() * (L - 1))) % L;
        }

        return [a, b, c];
    };

    const spin = () => {
        if (spinning) return;
        if (attempts >= MAX_ATTEMPTS) return;

        setSpinning(true);
        setWon(false);
        setSnap(false);

        const target = drawResult();

        const next = posRef.current.map((pos, i) => {
            const loops = 6 + i * 2;
            const base = pos + loops * L;
            const delta = (centerPos(target[i]) - (base % L) + L) % L;
            return base + delta;
        });

        posRef.current = next;
        setPositions(next);

        window.setTimeout(() => {
            const normalized = target.map(centerPos);
            posRef.current = normalized;
            setSnap(true);
            setPositions(normalized);
            requestAnimationFrame(() => setSnap(false));

            const isThreeEqual = target[0] === target[1] && target[1] === target[2];

            if (isThreeEqual) {
                setWon(true);
                setSpinning(false);

                setTimeout(() => {
                    navigate("/end", {
                        state: { status: "win" },
                    });
                }, 1000);

                return;
            }

            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= MAX_ATTEMPTS) {
                setSpinning(false);

                setTimeout(() => {
                    navigate("/end", { state: { status: "lost" } });
                }, 1000);

                return;
            }

            setSpinning(false);
        }, SPIN_MS[SPIN_MS.length - 1] + 150);
    };

    const ledClass = "bg-ired shadow-[0_0_20px_5px_rgba(189,0,0,0.6)]";
    const ledSpeed = "1.8s";
    const ledDelay = "0.9s";

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden text-white">
            <Fundo />


            <div className="relative z-10 flex min-h-screen flex-col items-center gap-10 px-6 pt-15 pb-10">
                {/* topo: voltar + logos */}
                <header className="relative flex w-full max-w-5xl flex-col items-center gap-6 px-8">
                    <NavLink
                        to="/"
                        className="absolute left-8 top-0 rounded-full border border-white/50 bg-white/15 p-3 backdrop-blur-sm transition-colors active:bg-white/30"
                    >
                        <ArrowLeft color="#ffffff" size="2.1875rem" />
                    </NavLink>

                    <img
                        src={LogoIred}
                        alt="Ired"
                        className="w-64 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
                    />
                </header>

                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-8xl font-bold italic tracking-tight uppercase drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]">
                        <span className="text-white">Slot </span>
                        <span className="ired-tag">
                            Machine
                        </span>
                    </h1>

                    <div className="flex items-center gap-3 text-xl text-white/60">
                        <span className="h-2 w-2 rounded-full bg-[#ffffff] shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
                        Tentativas: {attempts}/{MAX_ATTEMPTS}
                    </div>
                </div>

                <div className="relative">
                    {/* brilho ambiente atrás do gabinete */}
                    <div
                        className={`absolute -inset-10 rounded-[3.5rem] blur-3xl transition-colors duration-500 ${
                            won ? "bg-white/40" : "bg-white/20"
                        }`}
                    />

                    {/* gabinete */}
                    <div className="relative rounded-[2.75rem] border-2 border-white bg-gradient-to-b from-white via-[#f7eded] to-[#e3cfcf] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.45),inset_0_2px_0_rgba(255,255,255,0.9),inset_0_-4px_14px_rgba(120,0,0,0.25)]">
                        {/* barra de luz superior */}
                        <div
                            className={`mx-auto mb-5 h-2.5 w-[82%] rounded-full ${ledClass}`}
                            style={{
                                animation: `slot-glow ${ledSpeed} ease-in-out infinite`,
                            }}
                        />

                        {/* moldura interna escura */}
                        <div className="relative rounded-3xl bg-ired-night p-3.5 shadow-[inset_0_8px_26px_rgba(0,0,0,0.75)]">
                            {/* luzes verticais laterais */}
                            <div
                                className={`absolute left-2.5 top-1/2 h-[70%] w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${ledClass}`}
                                style={{
                                    animation: `slot-glow ${ledSpeed} ease-in-out infinite`,
                                }}
                            />
                            <div
                                className={`absolute right-2.5 top-1/2 h-[70%] w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full ${ledClass}`}
                                style={{
                                    animation: `slot-glow ${ledSpeed} ease-in-out infinite ${ledDelay}`,
                                }}
                            />

                            <div className="flex gap-3.5">
                                {positions.map((pos, i) => (
                                    <div
                                        key={i}
                                        className="relative overflow-hidden rounded-2xl bg-[#1f0000] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.06)]"
                                        style={{ width: `${REEL_W}rem`, height: `${CELL * 3}rem` }}
                                    >
                                        {/* fita de símbolos */}
                                        <div
                                            className="will-change-transform"
                                            style={{
                                                transform: `translate3d(0, ${-pos * CELL}rem, 0)`,
                                                transitionProperty: "transform",
                                                transitionDuration: snap ? "0ms" : `${SPIN_MS[i]}ms`,
                                                transitionTimingFunction:
                                                    "cubic-bezier(0.12, 0.62, 0.16, 1)",
                                                filter: spinning ? "blur(1.5px)" : "none",
                                            }}
                                        >
                                            {STRIP.map((symbol, j) => (
                                                <div
                                                    key={`${symbol.id}-${j}`}
                                                    className="p-2"
                                                    style={{ height: `${CELL}rem` }}
                                                >
                                                    <PrizeCard prize={symbol} size={CELL} />
                                                </div>
                                            ))}
                                        </div>

                                        {/* curvatura do cilindro */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1f0000]/75 via-transparent to-[#1f0000]/75" />
                                        {/* reflexo lateral do vidro */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/12 via-transparent to-[#1f0000]/25" />

                                        {/* linha de pagamento */}
                                        <div
                                            className={`pointer-events-none absolute left-0 right-0 border-y transition-colors duration-300 ${
                                                won ? "border-white" : "border-white/30"
                                            }`}
                                            style={{ top: `${CELL}rem`, height: `${CELL}rem` }}
                                        />

                                        {won && (
                                            <div
                                                className="pointer-events-none absolute left-0 right-0 border-4 border-white shadow-[0_0_30px_10px_rgba(255,255,255,0.55),inset_0_0_30px_rgba(255,255,255,0.45)]"
                                                style={{
                                                    top: `${CELL}rem`,
                                                    height: `${CELL}rem`,
                                                    animation: "slot-win-flash .5s ease-in-out infinite",
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* reflexo diagonal que percorre o vidro */}
                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                                <div
                                    className="h-full w-1/4 bg-white/12"
                                    style={{ animation: "slot-shine 4.5s ease-in-out infinite" }}
                                />
                            </div>
                        </div>

                        {/* barra de luz inferior */}
                        <div
                            className={`mx-auto mt-5 h-2.5 w-[82%] rounded-full ${ledClass}`}
                            style={{
                                animation: `slot-glow ${ledSpeed} ease-in-out infinite ${ledDelay}`,
                            }}
                        />
                    </div>
                </div>

                <button
                    onClick={spin}
                    disabled={spinning || attempts >= MAX_ATTEMPTS}
                    className="flex items-center gap-8 rounded-full bg-gradient-to-b from-white to-[#f3e1e1] py-3 pl-14 pr-3 text-4xl font-black italic tracking-widest uppercase text-ired shadow-[0_12px_30px_rgba(0,0,0,0.35),inset_0_-3px_0_rgba(189,0,0,0.12)] transition-transform duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {spinning ? "Girando..." : "Girar"}
                    <span className="flex h-18 w-18 items-center justify-center rounded-full bg-ired shadow-[0_6px_16px_rgba(189,0,0,0.45)]">
                        <RotateCw
                            size="2.25rem"
                            color="#ffffff"
                            strokeWidth={3}
                            className={spinning ? "animate-spin" : ""}
                        />
                    </span>
                </button>

                <div className="mt-5 flex flex-col items-center gap-1 text-center">
                    <h2 className="text-7xl font-black italic tracking-tight uppercase leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
                        Acerte 3 iguais
                    </h2>
                    <h2 className="mt-3 text-7xl font-black italic tracking-tight uppercase leading-tight">
                        <span className="ired-tag">e ganhe um brinde!</span>
                    </h2>

                  
                </div>

                <Rodape />
            </div>
        </div>
    );
}
