export default function Hero({image = "/images/hero.png"}) {
    return (
        <div className="min-h-screen">
            <img
                src={image}
                alt=""
                className="w-full min-h-screen object-cover"
            />
        </div>
    );
}
