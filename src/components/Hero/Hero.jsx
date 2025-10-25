export default function Hero({image = "/images/hero.png"}) {
    return (
        <div className="min-h-[90vh] max-md:min-h-[40vh] pt-14 lg:px-28 max-md:px-4">
            <img
                src={image}
                alt=""
                className="w-full h-[90vh] max-md:h-[90vh] min-h-[50vh] max-md:min-h-[40vh] object-cover"
            />
        </div>
    );
}
