import { useEffect, useRef, useState } from "react";
import PrizeCard from "./PrizeCard";
import { PRIZES } from "../config/prizes";

/**
 * Vitrine da slot machine para a Home: gira sozinha em loop, para, espera
 * e gira de novo. Não tem clique, não conta tentativas, não olha se caiu
 * três iguais e não navega para lugar nenhum — é só uma amostra do jogo.
 *
 * O jogo de verdade continua em pages/SlotMachine.tsx.
 */
// em rem, para acompanhar a escala do totem (ver index.css)
const CELL = 11.875;
const REEL_W = 12.8125;
const REPEATS = 10;

const L = PRIZES.length;
const STRIP = Array.from({ length: REPEATS * L }, (_, i) => PRIZES[i % L]);

const centerPos = (t: number) => (t - 1 + L) % L;

// mais curto que o jogo real: aqui a graça é o loop não parar muito tempo
const SPIN_MS = [1500, 1900, 2300];
const PAUSA_MS = 1800;
const INICIO_MS = 700;

export default function SlotMachineDemo() {
    const [positions, setPositions] = useState([
        centerPos(0),
        centerPos(1),
        centerPos(2),
    ]);
    const [snap, setSnap] = useState(false);
    const [spinning, setSpinning] = useState(false);

    const posRef = useRef(positions);

    useEffect(() => {
        let cancelado = false;
        const timers: number[] = [];

        const agendar = (fn: () => void, ms: number) => {
            timers.push(window.setTimeout(fn, ms));
        };

        const girar = () => {
            if (cancelado) return;

            setSpinning(true);

            const alvo = [0, 1, 2].map(() => Math.floor(Math.random() * L));

            const next = posRef.current.map((pos, i) => {
                const voltas = 4 + i * 2;
                const base = pos + voltas * L;
                const delta = (centerPos(alvo[i]) - (base % L) + L) % L;
                return base + delta;
            });

            posRef.current = next;
            setPositions(next);

            agendar(() => {
                if (cancelado) return;

                // volta a fita para o começo sem animação, senão ela
                // cresceria sem parar a cada giro
                const normalizado = alvo.map(centerPos);
                posRef.current = normalizado;
                setSnap(true);
                setPositions(normalizado);
                requestAnimationFrame(() => setSnap(false));

                setSpinning(false);

                agendar(girar, PAUSA_MS);
            }, SPIN_MS[SPIN_MS.length - 1] + 150);
        };

        agendar(girar, INICIO_MS);

        return () => {
            cancelado = true;
            timers.forEach((t) => window.clearTimeout(t));
        };
    }, []);

    return (
        <div className="relative">
            {/* brilho ambiente atrás do gabinete */}
            <div className="absolute -inset-8 rounded-[3rem] bg-white/20 blur-3xl" />

            {/* gabinete */}
            <div className="relative rounded-[2rem] border-2 border-white bg-gradient-to-b from-white via-[#f7eded] to-[#e3cfcf] p-4 shadow-[0_24px_55px_rgba(0,0,0,0.45),inset_0_2px_0_rgba(255,255,255,0.9),inset_0_-4px_14px_rgba(120,0,0,0.25)]">
                {/* barra de luz superior */}
                <div
                    className="mx-auto mb-3 h-2 w-[82%] rounded-full bg-ired shadow-[0_0_16px_4px_rgba(189,0,0,0.6)]"
                    style={{ animation: "slot-glow 1.8s ease-in-out infinite" }}
                />

                {/* moldura interna escura */}
                <div className="relative rounded-2xl bg-ired-night p-2.5 shadow-[inset_0_6px_20px_rgba(0,0,0,0.75)]">
                    {/* luzes verticais laterais */}
                    <div
                        className="absolute left-2 top-1/2 h-[70%] w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ired shadow-[0_0_16px_5px_rgba(189,0,0,0.6)]"
                        style={{ animation: "slot-glow 2.2s ease-in-out infinite" }}
                    />
                    <div
                        className="absolute right-2 top-1/2 h-[70%] w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-ired shadow-[0_0_16px_5px_rgba(189,0,0,0.6)]"
                        style={{ animation: "slot-glow 2.2s ease-in-out infinite 1.1s" }}
                    />

                    <div className="flex gap-2.5">
                        {positions.map((pos, i) => (
                            <div
                                key={i}
                                className="relative overflow-hidden rounded-xl bg-[#1f0000] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.06)]"
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
                                            className="p-1.5"
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
                                    className="pointer-events-none absolute left-0 right-0 border-y border-white/30"
                                    style={{ top: `${CELL}rem`, height: `${CELL}rem` }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* reflexo diagonal que percorre o vidro */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                        <div
                            className="h-full w-1/4 bg-white/12"
                            style={{ animation: "slot-shine 4.5s ease-in-out infinite" }}
                        />
                    </div>
                </div>

                {/* barra de luz inferior */}
                <div
                    className="mx-auto mt-3 h-2 w-[82%] rounded-full bg-ired shadow-[0_0_16px_4px_rgba(189,0,0,0.6)]"
                    style={{ animation: "slot-glow 1.8s ease-in-out infinite .9s" }}
                />
            </div>
        </div>
    );
}
