import building from "../assets/images/building.svg";
import project1 from "../assets/images/p1.png";
import project2 from "../assets/images/p2.png";
import project3 from "../assets/images/p3.png";
import project4 from "../assets/images/p4.png";
import user1 from "../assets/images/u1.png";
import user2 from "../assets/images/u2.png";
import user3 from "../assets/images/u3.png";
import member1 from "../assets/images/m1.png";
import member2 from "../assets/images/m2.png";
import member3 from "../assets/images/m3.png";
import member4 from "../assets/images/m4.png";
import member5 from "../assets/images/m5.png";
import member6 from "../assets/images/m6.png";
import type { Service, Project, Feedback, Member, Stat, FooterSection } from "../types";

export const services: Service[] = [
    {
        id: 1,
        icon: building,
        title: "Residential",
        description: "Design and construction of custom homes, villas, apartments, and townhouses",
    },
    {
        id: 2,
        icon: building,
        title: "Commercial",
        description: "Building offices, retail spaces, and restaurants, warehouses, commercial structures",
    },
    {
        id: 3,
        icon: building,
        title: "Renovations",
        description: "Quality Refurbishment, renovation, and modernization of your  existing properties",
    },
    {
        id: 4,
        icon: building,
        title: "Landscaping",
        description: "Creating beautiful outdoor landscapes, gardens, and creational areas.",
    },
    {
        id: 5,
        icon: building,
        title: "Interior Design",
        description: "Design and construction of office interiors, retail stores, and commercial spaces.",
    },
    {
        id: 6,
        icon: building,
        title: "Structural Repair",
        description: "Fully Strengthening and repairing your existing structures for safety and longevity.",
    },
];

export const projects: Project[] = [
    {
        id: 1,
        image: project1,
        title: "Interiors Designs",
        description: "Step into a world of captivating commercial spaces designed to elevate your business.",
        category: "Interior",
        date: "Aug 2022",
    },
    {
        id: 2,
        image: project2,
        title: "Residential Building",
        description: "Step into a world of captivating commercial spaces designed to elevate your business.",
        category: "Building",
        date: "Nov 2022",
    },
    {
        id: 3,
        image: project3,
        title: "Commercial Complex",
        description: "Step into a world of captivating commercial spaces designed to elevate your business.",
        category: "Complex",
        date: "Dec 2022",
    },
    {
        id: 4,
        image: project4,
        title: "Structural Repair",
        description: "Step into a world of captivating commercial spaces designed to elevate your business.",
        category: "Complex",
        date: "Dec 2022",
    },
];

export const feedbacks: Feedback[] = [
    {
        id: 1,
        role: "Homeowner",
        image: user1,
        name: "-Mark Johnson",
        feedback: "I recently had the privilege of having you build my dream home, and I couldn't be happier with the results. The entire process.",
    },
    {
        id: 2,
        role: "Property Developer",
        image: user2,
        name: "-Lisa Miller",
        feedback: "I recently had the privilege of having you build my dream home, and I couldn't be happier with the results. The entire process.",
    },
    {
        id: 3,
        role: "Hotel Owner",
        image: user3,
        name: "-David Lee",
        feedback: "I recently had the privilege of having you build my dream home, and I couldn't be happier with the results. The entire process.",
    },
];

export const members: Member[] = [
    {
        id: 1,
        role: "Civil Engineer",
        image: member1,
        name: "Ethan Walker",
    },
    {
        id: 2,
        role: "Project Engineer",
        image: member2,
        name: "Ava Mitchell",
    },
    {
        id: 3,
        role: "Senior Civil Engineer",
        image: member3,
        name: "Jackson Thompson",
    },
    {
        id: 4,
        role: "Materials Engineer",
        image: member4,
        name: "Williams carie",
    },
    {
        id: 5,
        role: "Project Engineer",
        image: member5,
        name: "Benjamin Carter",
    },
    {
        id: 6,
        role: "Editor",
        image: member6,
        name: "Sophia Robinson",
    },
];

export const navItems: string[] = ["About Us", "Projects", "Services", "Our Team"];

export const stats: Stat[] = [
    { value: "600+", text: "Worked with 600+ big companies" },
    { value: "800+", text: "Projects completed successfully" },
    { value: "99%", text: "We stand with 99% success rate" },
];

export const footerLinks: FooterSection[] = [
    {
        id: 1,
        title: "Company",
        links: [
            { id: 1, name: "About Us", link: "/" },
            { id: 2, name: "Projects", link: "/" },
            { id: 3, name: "Services", link: "/" },
            { id: 4, name: "Our Team", link: "/" },
        ],
    },
    {
        id: 2,
        title: "Help",
        links: [
            { id: 1, name: "Contact Us", link: "/" },
            { id: 2, name: "FAQs", link: "/" },
            { id: 3, name: "Support", link: "/" },
            { id: 4, name: "Feedback", link: "/" },
        ],
    },
    {
        id: 3,
        title: "Others",
        links: [
            { id: 1, name: "Privacy", link: "/" },
            { id: 2, name: "Terms", link: "/" },
            { id: 3, name: "Cookies", link: "/" },
            { id: 4, name: "Policies", link: "/" },
        ],
    },
]