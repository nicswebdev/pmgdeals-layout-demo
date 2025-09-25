export default function HeroDetails({image = "/images/hero.png"}) {
    return (
        <div className="min-h-[90vh] max-md:min-h-[40vh]">
            <img
                src={image}
                alt=""
                className="w-full h-[90vh] max-md:h-[90vh] min-h-[50vh] max-md:min-h-[40vh] object-cover"
            />
        </div>
    );
}
