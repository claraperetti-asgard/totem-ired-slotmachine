import type { LucideIcon } from "lucide-react";
import CardDataCenter from "../assets/cards/data-center.jpeg";
import CardRedes from "../assets/cards/redes.jpeg";
import CardFibraOptica from "../assets/cards/fibra-optica.jpeg";
import CardLogoIredEmpresas from "../assets/cards/logo-ired-empresas.jpeg";
import CardSeguranca from "../assets/cards/seguranca.jpeg";
import CardIredEmpresas from "../assets/cards/ired-empresas.jpeg";

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

/* os cards já vêm prontos (arte + texto), então ocupam a figura inteira;
   o `bg` é a cor do card, que aparece enquanto a imagem carrega */
export const PRIZES: Prize[] = [
    {
        id: "data-center",
        label: "Data Center",
        bg: "#ffffff",
        image: CardDataCenter,
        imageFill: true,
    },
    {
        id: "logo",
        label: "Logo Ired Empresas",
        bg: "#bd0000",
        image: CardLogoIredEmpresas,
        imageFill: true,
    },
    {
        id: "redes",
        label: "Redes escalonáveis e conetividade",
        bg: "#ffffff",
        image: CardRedes,
        imageFill: true,
    },
    {
        id: "seguranca",
        label: "Segurança integrada",
        bg: "#bd0000",
        image: CardSeguranca,
        imageFill: true,
    },
    {
        id: "fibra-optica",
        label: "Fibra óptica",
        bg: "#ffffff",
        image: CardFibraOptica,
        imageFill: true,
    },
    {
        id: "ired-empresas",
        label: "Ired Empresas",
        bg: "#bd0000",
        image: CardIredEmpresas,
        imageFill: true,
    },
];
