// pages/api/order.js

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).end("Method Not Allowed");
    }

    try {
        const apiRes = await fetch(
            "https://cms.pmgdeals.com/api/public/order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            }
        );

        const data = await apiRes.text();
        // Mirror status and body back to the client
        res.status(apiRes.status).send(data);
    } catch (err) {
        console.error("Proxy error:", err);
        res.status(502).json({error: "Bad gateway"});
    }
}
