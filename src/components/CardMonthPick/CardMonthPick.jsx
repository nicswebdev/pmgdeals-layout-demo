import {FaRegStar, FaStar} from "react-icons/fa6";
import {ButtonHeart} from "../ButtonHeart";
export default function CardMonthPick({deals}) {
    const randomString = Math.random().toString(36).substring(2, 9);

    return (
        <div className="relative">
            <a
                href="/description"
                className="group flex flex-col transition-all duration-300 hover:opacity-70"
            >
                <div className="aspect-video md:aspect-[2/1.25] w-full rounded-[1.25rem] bg-gray-600"></div>
                <div className="pt-8 text-white">
                    <p className="pb-2 lg:pb-4 font-medium max-lg:text-[0.75rem]">
                        {deals.property_name}
                    </p>
                    <p className="pb-4 font-bold lg:text-[1.5rem]">
                        Drag Queen Show
                    </p>
                    <div className="pb-4 lg:pb-6 flex flex-wrap gap-2">
                        <p className="lg:text-[1.5rem]">IDR 223,000</p>
                        <p className="relative px-2 lg:text-[1.5rem]">
                            <span>IDR 250,000</span>
                            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.0625rem] bg-red"></span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center">
                            {[1, 2, 3, 4].map((item) => (
                                <FaStar
                                    className="w-3 lg:w-5 h-3 lg:h-5"
                                    key={`month-pick-star-${randomString}-${item}`}
                                    color="#DBA527"
                                />
                            ))}
                            <FaRegStar
                                className="w-3 lg:w-5 h-3 lg:h-5"
                                color="#DBA527"
                            />
                        </div>
                        <p className="font-medium max-lg:text-[0.75rem]">
                            1,922
                        </p>
                    </div>
                </div>
            </a>
            <div className="absolute top-3 lg:top-6 right-3 lg:right-6">
                <ButtonHeart />
            </div>
        </div>
    );
}
