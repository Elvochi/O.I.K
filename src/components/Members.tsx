import { members } from "../data";
import { chunkArray } from "../helpers";
import HeadSection from "./HeadSection";
import type { Member } from "../types";

const Members = () => {
    const membersChunks = chunkArray(members, 3);
    return (
        <div id="our-team" className="w-full md:py-[120px] py-24 md:px-[120px] px-5 flex flex-col gap-8">
            <HeadSection title="Team members" description="Meet the Collaborative Minds of Our Construction Team" />
            <div className="w-full flex flex-col gap-8">
                {membersChunks.map((chunk, index) => (
                    <div key={index} className="w-full flex md:flex-row flex-col items-center justify-between gap-6">
                        {chunk.map((member: Member) => (
                            <div key={member.id} className="w-full flex md:items-start items-center gap-8 border border-gray-border rounded-xl py-6 px-8">
                                <img src={member.image} alt={member.name} className="w-[88px] h-[88px]" />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                                    <span className="text-gray-light font-bold text-sm">{member.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;