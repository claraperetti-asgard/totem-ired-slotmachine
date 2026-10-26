import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Frown, Gift, MapPin, RotateCcw, Wifi } from "lucide-react";
import confetti from "canvas-confetti";
import LogoIred from "../assets/ired/logo-ired-branco.png";
import { Fundo, Rodape } from "../components/Marca";

const IRED_CONFETTI = ["#ffffff", "#bd0000", "#ffffff", "#e01b1b", "#ffd6d6"];

export default function EndScreen() {
    const { state } = useLocation();

    const status = state?.status;
    const isWin = status === "win";

    useEffect(() => {
        if (!isWin) return;

        const colors = IRED_CONFETTI;

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors,
        });

        const end = Date.now() + 3000;

        let cancelled = false;

        const frame = () => {
            if (cancelled) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors,
            });

            if (Date.now() < end) requestAnimationFrame(frame);
        };

        frame();

        return () => {
            cancelled = true;
        };
    }, [isWin]);

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden text-white">
            {/* ---------- FUNDO ---------- */}
            <Fundo />

            {/* ---------- CONTEÚDO ---------- */}
            <div className="relative z-10 flex min-h-screen flex-col items-center gap-10 px-6 pt-15 pb-10">
                <header className="flex w-full max-w-5xl flex-col items-center px-8">
                    <img
                        src={LogoIred}
                        alt="Ired"
                        className="w-80 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
                    />
                </header>

                <div className="flex w-full flex-1 flex-col items-center justify-center gap-16 text-center">
                    {isWin ? <WinContent /> : <LostContent />}

                    {/* pílula com seta redonda, mesmo botão da Home */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-8 rounded-full bg-gradient-to-b from-white to-[#f3e1e1] py-3 pl-14 pr-3 text-4xl font-black italic uppercase tracking-widest text-ired shadow-[0_16px_40px_rgba(0,0,0,0.35),inset_0_-3px_0_rgba(189,0,0,0.12)] transition-transform duration-200 active:scale-95"
                    >
                        Jogar novamente
                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ired shadow-[0_6px_16px_rgba(189,0,0,0.45)]">
                            <RotateCcw size="2.5rem" color="#ffffff" strokeWidth={3} />
                        </span>
                    </NavLink>
                </div>

                <Rodape />
            </div>
        </div>
    );
}

/**
 * Cartão branco com borda vermelha e a etiqueta inclinada no topo,
 * no mesmo desenho dos cards de plano do site (OFERTA TURBO, MAIS PEDIDO).
 */
function Cartao({
    etiqueta,
    icone,
    children,
}: {
    etiqueta: string;
    icone: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div
            className="relative w-full max-w-3xl"
            style={{ animation: "jackpot-pop 0.7s cubic-bezier(.2,1.4,.4,1) both" }}
        >
            {/* halo branco atrás do cartão */}
            <div
                className="absolute -inset-10 rounded-[4rem] bg-white/25 blur-3xl"
                style={{ animation: "jackpot-glow 2.4s ease-in-out infinite" }}
            />

            <div className="relative flex flex-col items-center rounded-[3rem] border-4 border-ired bg-[#fdf7f7] px-12 pb-14 pt-24 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
                {/* etiqueta inclinada vermelha */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 -skew-x-12 bg-ired px-12 py-4 text-3xl font-black italic uppercase tracking-wide text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                    {etiqueta}
                </span>

                {/* ícone em círculo vermelho, saindo do topo */}
                <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-b from-ired-light to-ired-dark shadow-[0_14px_34px_rgba(189,0,0,0.45),inset_0_3px_0_rgba(255,255,255,0.3)]">
                    {icone}
                </div>

                {children}
            </div>
        </div>
    );
}

function WinContent() {
    return (
        <Cartao
            etiqueta="Parabéns!"
            icone={<Gift size="5.5rem" color="#ffffff" strokeWidth={2} />}
        >
            <p className="text-4xl font-bold uppercase tracking-[0.2em] text-[#3a3a3a]">
                Você ganhou
            </p>

            <p className="mt-2 text-9xl font-black italic uppercase leading-[0.95] tracking-tight text-ired">
                Um brinde
            </p>

            <p className="mt-3 text-5xl font-black italic uppercase tracking-tight text-[#1f1f1f]">
                da Ired
            </p>

            <div className="mt-10 h-px w-2/3 bg-ired/20" />

            <div className="mt-8 flex items-center gap-4 rounded-full bg-ired px-8 py-4 text-2xl font-bold uppercase tracking-[0.15em] text-white">
                <MapPin size="1.875rem" strokeWidth={2.5} />
                Retire seu brinde no estande
            </div>
        </Cartao>
    );
}

function LostContent() {
    return (
        <Cartao
            etiqueta="Que pena!"
            icone={<Frown size="5.5rem" color="#ffffff" strokeWidth={2} />}
        >
            <p className="text-8xl font-black italic uppercase leading-[0.95] tracking-tight text-ired">
                Não foi
                <br />
                dessa vez
            </p>

            <p className="mt-6 text-3xl font-bold uppercase tracking-[0.15em] text-[#3a3a3a]">
                Você não acertou 3 iguais
            </p>

            <div className="mt-10 h-px w-2/3 bg-ired/20" />

            <div className="mt-8 flex items-center gap-4 rounded-full bg-ired px-8 py-4 text-2xl font-bold uppercase tracking-[0.1em] text-white">
                <Wifi size="1.875rem" strokeWidth={2.5} />
                Conheça nossos planos
            </div>
        </Cartao>
    );
}
