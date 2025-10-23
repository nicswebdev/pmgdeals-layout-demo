export const menuItems = [
    {
        id: 2,
        title: "About Us",
        url: "/about-us",
        target: "_self",
    },
    {
        id: 3,
        title: "Our Deals",
        url: null,
        target: "_self",
        children: [
            {
                id: "deal-1",
                title: "Bali Niksoma Boutique Beach Resort",
                url: "/",
                target: "_self",
            },
            {
                id: "deal-2",
                title: "The Magani Hotel and Spa",
                url: "/property/2",
                target: "_self",
            },
            {
                id: "deal-3",
                title: "The Bandha Hotel & Suites",
                url: "/property/3",
                target: "_self",
            },
        ],
    },
    {
        id: 4,
        title: "FAQ",
        url: "/faq",
        target: "_self",
    },
    {
        id: 5,
        title: "Contact Us",
        url: "/contact-us",
        target: "_self",
    },
];
