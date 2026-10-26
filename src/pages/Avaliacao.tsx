import { NavLink } from "react-router-dom";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import LogoIred from "../assets/ired/logo-ired-branco.png";
import { Fundo, Rodape } from "../components/Marca";
import { LINK_AVALIACAO_GOOGLE } from "../config/avaliacao";

const PASSOS = [
    "Aponte a câmera do celular",
    "Deixe sua avaliação no Google",
    "Toque em jogar e boa sorte!",
];

/**
 * Passo entre a Home e o jogo: pede uma avaliação no Google pelo QR code.
 * O botão de jogar fica sempre liberado — não há como o totem saber se
 * a pessoa avaliou de fato.
 */
export default function Avaliacao() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden text-white">
            <Fundo />

            <div className="relative z-10 flex min-h-screen flex-col items-center gap-10 px-6 pt-15 pb-10">
                <header className="relative flex w-full max-w-5xl flex-col items-center px-8">
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

                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-8xl font-black italic uppercase tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]">
                        <span className="text-white">Nos </span>
                        <span className="ired-tag">avalie</span>
                    </h1>
                    <p className="text-4xl font-black italic uppercase tracking-tight text-white">
                        e ganhe uma chance de jogar
                    </p>
                </div>

                {/* ---------- CARTÃO DO QR CODE ---------- */}
                <div className="relative mt-6 w-full max-w-3xl">
                    <div
                        className="absolute -inset-10 rounded-[4rem] bg-white/25 blur-3xl"
                        style={{ animation: "jackpot-glow 2.4s ease-in-out infinite" }}
                    />

                    <div className="relative flex flex-col items-center rounded-[3rem] border-4 border-ired bg-[#fdf7f7] px-12 pb-12 pt-20 text-ired shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
                    

                        <div className="flex gap-2">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <Star
                                    key={i}
                                    size="3.25rem"
                                    color="#bd0000"
                                    fill="#bd0000"
                                />
                            ))}
                        </div>

                        <div className="mt-8 rounded-[2rem] border-4 border-ired/15 bg-white p-6 shadow-[0_10px_30px_rgba(189,0,0,0.15)]">
                            <QRCodeSVG
                                value={LINK_AVALIACAO_GOOGLE}
                                size={512}
                                level="M"
                                fgColor="#5c0000"
                                bgColor="#ffffff"
                                className="h-[22rem] w-[22rem]"
                            />
                        </div>

                        <ol className="mt-10 flex w-full flex-col gap-4 text-left">
                            {PASSOS.map((passo, i) => (
                                <li key={passo} className="flex items-center gap-5">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ired text-2xl font-black italic text-white">
                                        {i + 1}
                                    </span>
                                    <span className="text-2xl font-bold uppercase tracking-wide text-[#3a3a3a]">
                                        {passo}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* pílula com seta redonda, mesmo botão da Home */}
                <NavLink
                    to="/slotmachine"
                    className="group relative mt-4 flex items-center justify-center"
                >
                    <span
                        className="absolute -inset-6 rounded-full bg-white/30 blur-2xl"
                        style={{ animation: "jackpot-glow 2s ease-in-out infinite" }}
                    />

                    <span className="relative flex items-center gap-8 rounded-full bg-gradient-to-b from-white to-[#f3e1e1] py-3 pl-16 pr-3 text-4xl font-black italic uppercase tracking-widest text-ired shadow-[0_16px_40px_rgba(0,0,0,0.35),inset_0_-3px_0_rgba(189,0,0,0.12)] transition-transform duration-200 group-active:scale-95">
                        Jogar
                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ired shadow-[0_6px_16px_rgba(189,0,0,0.45)]">
                            <ArrowRight size="2.5rem" color="#ffffff" strokeWidth={3} />
                        </span>
                    </span>
                </NavLink>

                <Rodape />
            </div>
        </div>
    );
}
