interface HeadSectionProps {
    isDark?: boolean;
    hasButton?: boolean;
    title: string;
    description: string;
}

const HeadSection = ({ isDark = true, hasButton = true, title, description }: HeadSectionProps) => {
    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-[32px]">
                <div className="w-[93px] h-[6px] bg-primary"></div>
                <div className="flex flex-col gap-2">
                    <h1 className={`text-[44px] font-bold ${isDark ? 'text-secondary' : 'text-white'}`}>{title}</h1>
                    <p className={`font-bold ${isDark ? 'text-gray-light' : 'text-gray'}`}>
                        {description}
                    </p>
                </div>
            </div>
            {hasButton ? <button className={`border ${isDark ? 'border-primary text-primary' : 'border-gray text-gray'} md:flex hidden items-center justify-center cursor-pointer font-bold text-xl rounded-lg px-6 h-12`}>
                See All
            </button> : null}
        </div>
    )
}

export default HeadSection