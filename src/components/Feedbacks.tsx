import { feedbacks } from "../data";
import HeadSection from "./HeadSection";
import type { Feedback } from "../types";

const Feedbacks = () => {
    return (
        <div className="w-full md:pt-[120px] pt-24 md:pb-[60px] pb-24 md:px-[120px] px-5 flex flex-col gap-12">
            <HeadSection title="Customer feedbacks" description="Don't just take our word for it. hear directly from our valued clients" />
            <div className="w-full flex md:flex-row flex-col items-center justify-between gap-6">
                {feedbacks.map((feedback: Feedback) => (
                    <div key={feedback.id} className="w-full flex flex-col md:items-start items-center gap-6">
                        <img src={feedback.image} alt={feedback.name} className="w-[72px] h-[72px]" />
                        <p className="text-gray-light font-bold max-w-[400px] md:text-left text-center">
                            {feedback.feedback}
                        </p>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-secondary md:text-left text-center">{feedback.name}</h3>
                            <span className="text-gray-light font-bold text-sm ml-2 md:text-left text-center">{feedback.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feedbacks;