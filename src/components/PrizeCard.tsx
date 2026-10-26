import type { Prize } from "../config/prizes";


export default function PrizeCard({ prize, size }: { prize: Prize; size: number }) {
    return (
  
        <div
            className="relative h-full w-full overflow-hidden rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_0_0_1px_rgba(0,0,0,0.18)]"
            style={{ backgroundColor: prize.bg }}
        >
            {prize.imageFill ? (
               
                <img
                    src={prize.image}
                    alt={prize.label}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : null}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/15" />

            {!prize.imageFill && (
                <div className="relative flex h-full w-full items-center justify-center p-6">
                    {prize.icon ? (
                        <prize.icon
                            size={`${size * 0.5}rem`}
                            color={prize.fg ?? "#ffffff"}
                            strokeWidth={2.2}
                            aria-label={prize.label}
                            className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                        />
                    ) : (
                        <img
                            src={prize.image}
                            alt={prize.label}
                            className="max-h-full max-w-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
