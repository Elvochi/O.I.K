import facebook from '../assets/images/facebook.svg'
import linkedin from '../assets/images/linkedin.svg'
import instagram from '../assets/images/instagram.svg'
import { footerLinks } from '../data'
import type { FooterSection, FooterLink } from '../types'

const Footer = () => {
    return (
        <div className='w-full flex flex-col gap-[60px] pt-[80px]'>
            <div className="w-full flex md:items-center items-start justify-between md:px-[120px] px-5 md:gap-[100px] gap-16 md:flex-row flex-col">
                <div className="flex flex-col gap-2">
                    <span className='w-full flex text-yellow-400 justify-center font-bold'>
                        O.I.K
                    </span>
                    <span className='w-full flex text-black justify-center font-bold'>
                        CONSULATANTS L.T.D
                    </span>
                    <p className='text-gray-light font-bold max-w-[400px]'>
                        we are more than just builders. we are creators of architectural marvels. With a passion for excellence and an unwavering commitment to quality
                    </p>
                    <div className="flex items-center gap-8 mt-9">
                        <img src={facebook} alt="facebook" className="cursor-pointer w-[12px]" />
                        <img src={linkedin} alt="linkedin" className="cursor-pointer w-[18px]" />
                        <img src={instagram} alt="instagram" className="cursor-pointer w-[18px]" />
                    </div>
                </div>
                {footerLinks.map((link: FooterSection) => (
                    <div key={link.id} className="flex flex-col gap-6">
                        <h1 className="text-secondary font-bold text-xl">{link.title}</h1>
                        {link.links.map((item: FooterLink) => (
                            <div key={item.id} className="flex flex-col gap-2">
                                <a href={item.link} className="text-gray-light font-bold">{item.name}</a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="w-full flex items-center justify-center border-t border-gray-border h-[74px]">
                <span className="text-gray-light font-bold">
                    Copyright © 2025.
                </span>
            </div>
        </div>
    )
}

export default Footer;