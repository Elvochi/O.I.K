interface HeadSectionProps {
    isDark?: boolean;
    hasButton?: boolean;
    title: string;
    description: string;
}

const HeadSection = ({ isDark = true, title, description }: HeadSectionProps) => {
    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-[32px]">
                <div className="w-[93px] h-[6px] bg-primary"></div>
                <div className="flex flex-col gap-2">
                    <h1 className={`text-[28px] md:text-[44px] font-bold ${isDark ? 'text-secondary' : 'text-white'}`}>{title}</h1>
                    <p className={`font-bold ${isDark ? 'text-gray-light' : 'text-gray'}`}>
                        {description}
                    </p>
                </div>
            </div>
    
        </div>
    )
}

export default HeadSection