import {
    Gauge,
    Headset,
    Router,
    ShieldCheck,
    Wifi,
    type LucideIcon,
} from "lucide-react";
import LogoIredBranco from "../assets/ired/logo-ired-branco.png";
import LogoIredVermelho from "../assets/ired/logo-ired-vermelho.png";

/** figuras dos rolos — quem acerta 3 iguais ganha um brinde da Ired */
export type Prize = {
    id: string;
    label: string;
    bg: string;
    /** cor do ícone */
    fg?: string;
    image?: string;
    imageFill?: boolean;
    /** ícone no lugar da imagem, nas cores da marca */
    icon?: LucideIcon;
};

export const PRIZES: Prize[] = [
    {
        id: "wifi",
        label: "Wi-Fi",
        bg: "#bd0000",
        icon: Wifi,
        fg: "#ffffff",
    },
    {
        id: "logo",
        label: "Logo Ired",
        bg: "#ffffff",
        image: LogoIredVermelho,
    },
    {
        id: "velocidade",
        label: "Velocidade",
        bg: "#8f0000",
        icon: Gauge,
        fg: "#ffffff",
    },
    {
        id: "atendimento",
        label: "Atendimento",
        bg: "#ffffff",
        icon: Headset,
        fg: "#bd0000",
    },
    {
        id: "seguranca",
        label: "Segurança",
        bg: "#bd0000",
        icon: ShieldCheck,
        fg: "#ffffff",
    },
    {
        id: "roteador",
        label: "Roteador",
        bg: "#ffffff",
        icon: Router,
        fg: "#bd0000",
    },
    {
        id: "logo-branco",
        label: "Logo Ired branco",
        bg: "#5c0000",
        image: LogoIredBranco,
    },
];
