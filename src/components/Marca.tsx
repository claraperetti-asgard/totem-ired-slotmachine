import LogoIredBranco from "../assets/ired/logo-ired-branco.png";

/**
 * Fundo das telas, inspirado no site: vermelho da marca com raios de
 * velocidade saindo do centro, a textura de pontinhos do banner e o
 * splash do logo bem apagado ao fundo.
 */
export function Fundo() {
    return (
        <>
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,#e01b1b_0%,#bd0000_45%,#7a0000_100%)]" />

            {/* raios de luz, girando bem devagar */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div
                    className="absolute left-1/2 top-[45%] h-[250vmax] w-[250vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
                    style={{
                        background:
                            "repeating-conic-gradient(from 0deg,#ffffff 0deg 1.2deg,transparent 1.2deg 7deg)",
                        maskImage:
                            "radial-gradient(circle,transparent 4%,#000 22%,transparent 55%)",
                        WebkitMaskImage:
                            "radial-gradient(circle,transparent 4%,#000 22%,transparent 55%)",
                        animation: "ired-rays 240s linear infinite",
                    }}
                />
            </div>

            {/* grade de pontinhos, mais forte em cima e sumindo pra baixo */}
            <div
                className="pointer-events-none fixed inset-0 opacity-25"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.55) 1.5px, transparent 1.6px)",
                    backgroundSize: "1.5rem 1.5rem",
                    maskImage: "linear-gradient(to bottom,#000,transparent 55%)",
                    WebkitMaskImage: "linear-gradient(to bottom,#000,transparent 55%)",
                }}
            />

            {/* splash gigante, cortado pela borda direita */}
            <img
                src={LogoIredBranco}
                alt=""
                aria-hidden
                className="pointer-events-none fixed -right-[35%] top-[38%] w-[110%] max-w-none -rotate-12 opacity-[0.06]"
            />

            <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
        </>
    );
}

/** assinatura no pé das telas, no lugar do logo da Conviver */
export function Rodape() {
    return (
        <div className="mt-auto flex w-full max-w-5xl flex-col items-center gap-3 px-8 text-center">
            <p className="text-5xl font-black italic uppercase tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
                Internet <span className="ired-tag">é Ired</span>
            </p>
            <p className="text-xl font-semibold uppercase tracking-[0.3em] text-white/70">
                Internet no seu ritmo.
            </p>
        </div>
    );
}
