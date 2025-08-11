export interface Member {
    id: string | number;
    name: string;
    role: string;
    image: string;
}

export interface Service {
    id: string | number;
    title: string;
    description: string;
    icon: string;
}

export interface Project {
    id: string | number;
    image: string;
    title: string;
    description: string;
    category: string;
    date: string;
}

export interface Feedback {
    id: string | number;
    role: string;
    image: string;
    name: string;
    feedback: string;
}

export interface Stat {
    value: string;
    text: string;
}

export interface FooterLink {
    id: string | number;
    name: string;
    link: string;
}

export interface FooterSection {
    id: string | number;
    title: string;
    links: FooterLink[];
}