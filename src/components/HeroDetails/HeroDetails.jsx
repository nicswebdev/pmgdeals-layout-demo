export default function HeroDetails({image = "/images/hero.png"}) {
    return (
        <div className="min-h-screen max-md:min-h-[40vh]">
            <img
                src={image}
                alt=""
                className="w-full h-[100vh] max-md:h-[40vh] min-h-screen max-md:min-h-[40vh] object-cover"
            />
        </div>
    );
}
