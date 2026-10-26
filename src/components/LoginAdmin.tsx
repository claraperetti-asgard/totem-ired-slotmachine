import { useRef, useState } from "react";
import { Eye, EyeOff, Lock, User, X } from "lucide-react";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { ADMIN_PASSWORD, ADMIN_USER } from "../config/gameSettings";

const Keyboard = (KeyboardReact as any).default || KeyboardReact;

type Props = {
    /** chamado quando usuário e senha conferem */
    onSuccess: () => void;
    /** chamado no X e no Cancelar — quem usa decide se fecha ou sai */
    onClose: () => void;
    /** texto do topo, para dizer a que o login dá acesso */
    titulo?: string;
};

export default function LoginAdmin({ onSuccess, onClose, titulo }: Props) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [campoAtivo, setCampoAtivo] = useState<"user" | "password">("user");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [layoutName, setLayoutName] = useState("default");
    const keyboardRef = useRef<any>(null);

    const focar = (campo: "user" | "password", valor: string) => {
        setCampoAtivo(campo);
        keyboardRef.current?.setInput(valor);
    };

    const onKeyboardChange = (valor: string) => {
        setError("");
        if (campoAtivo === "user") setUser(valor);
        else setPassword(valor);
    };

    const onKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") {
            setLayoutName((atual) => (atual === "default" ? "shift" : "default"));
        }
    };

    const entrar = () => {
        if (
            user.trim().toLowerCase() === ADMIN_USER &&
            password === ADMIN_PASSWORD
        ) {
            onSuccess();
            return;
        }

        setError("Usuário ou senha inválidos");
    };

    // classes do campo: o ativo ganha a borda laranja
    const campo = (ativo: boolean) =>
        `flex items-center gap-3 rounded-2xl border-2 bg-white px-5 py-3 transition-colors ${
            ativo ? "border-ired shadow-[0_0_0_5px_rgba(255,255,255,0.35)]" : "border-transparent"
        }`;

    return (
        // text-white aqui e não herdado do pai: senão a cor do texto muda
        // conforme a página que abre o modal
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ired-night/85 px-8 text-white">
            <div className="relative w-full max-w-3xl space-y-6 rounded-3xl border border-white/40 bg-gradient-to-b from-ired-dark to-ired-deep p-10 shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-2"
                >
                    <X color="#ffffff" size="1.5rem" />
                </button>

                <h2 className="text-center text-3xl font-black uppercase tracking-[0.2em]">
                    Acesso <span className="text-white">{titulo ?? "Admin"}</span>
                </h2>

                {/* ---------- CAMPOS ---------- */}
                <div className="space-y-3">
                    <div
                        className={campo(campoAtivo === "user")}
                        onClick={() => focar("user", user)}
                    >
                        <User size="1.5rem" color="#bd0000" />
                        <input
                            readOnly
                            value={user}
                            onFocus={() => focar("user", user)}
                            placeholder="USUÁRIO"
                            className="w-full bg-transparent text-2xl font-bold uppercase tracking-wide text-ired-deep placeholder-ired-deep/40 outline-none"
                        />
                    </div>

                    <div
                        className={campo(campoAtivo === "password")}
                        onClick={() => focar("password", password)}
                    >
                        <Lock size="1.5rem" color="#bd0000" />
                        <input
                            readOnly
                            type={senhaVisivel ? "text" : "password"}
                            value={password}
                            onFocus={() => focar("password", password)}
                            placeholder="SENHA"
                            className="w-full bg-transparent text-2xl font-bold uppercase tracking-wide text-ired-deep placeholder-ired-deep/40 outline-none"
                        />

                        <button
                            type="button"
                            aria-label={
                                senhaVisivel ? "Ocultar senha" : "Mostrar senha"
                            }
                            onClick={(e) => {
                                // sem isso o clique cairia no container e
                                // roubaria o foco do campo
                                e.stopPropagation();
                                setSenhaVisivel((v) => !v);
                            }}
                            className="shrink-0 rounded-lg p-1 text-ired-deep/60 transition-colors active:text-ired"
                        >
                            {senhaVisivel ? (
                                <EyeOff size="1.5rem" />
                            ) : (
                                <Eye size="1.5rem" />
                            )}
                        </button>
                    </div>
                </div>

                {/* ---------- TECLADO ---------- */}
                <div className="rounded-2xl border border-white/10 bg-ired-night/70 p-3">
                    <Keyboard
                        keyboardRef={(r: any) => (keyboardRef.current = r)}
                        baseClass="slot-keyboard slot-keyboard-mini"
                        layoutName={layoutName}
                        onChange={onKeyboardChange}
                        onKeyPress={onKeyPress}
                        disableCaretPositioning={true}
                        layout={{
                            default: [
                                "1 2 3 4 5 6 7 8 9 0",
                                "q w e r t y u i o p",
                                "a s d f g h j k l ç",
                                "{shift} z x c v b n m {backspace}",
                                "@ . _ - {space}",
                            ],
                            shift: [
                                "1 2 3 4 5 6 7 8 9 0",
                                "Q W E R T Y U I O P",
                                "A S D F G H J K L Ç",
                                "{shift} Z X C V B N M {backspace}",
                                "@ . _ - {space}",
                            ],
                        }}
                        display={{
                            "{backspace}": "⌫",
                            "{shift}": "⇧",
                            "{space}": "Espaço",
                        }}
                    />
                </div>

                {error && (
                    <p className="text-center text-lg font-bold text-white">
                        {error}
                    </p>
                )}

                {/* ---------- AÇÕES ---------- */}
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-full border-2 border-white/25 px-8 py-4 text-xl font-bold uppercase tracking-widest text-white/70 transition-transform active:scale-95"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={entrar}
                        className="flex-1 rounded-full bg-gradient-to-b from-white to-[#f3e1e1] px-8 py-4 text-xl font-black uppercase tracking-widest text-ired shadow-[0_10px_26px_rgba(0,0,0,0.35),inset_0_-3px_0_rgba(189,0,0,0.12)] transition-transform active:scale-95"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}
