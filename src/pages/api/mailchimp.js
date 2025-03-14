export default async function mailchimp(req, res) {
    const {email, tags} = req.body; // Accept tags from the request body

    if (!email) {
        return res.status(400).json({error: "Email is required."});
    }

    const API_KEY = "5305650ce92d76ca48a9217ca2306166-us12";
    const AUDIENCE_ID = "7ffb8d0171";
    const DATACENTER = "us12";

    // URL for adding a member to the list
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const data = {
        email_address: email,
        status: "pending",
    };

    const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64ApiKey}`,
        },
        body: JSON.stringify(data),
    };

    try {
        // Add the subscriber
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (response.status === 400 && responseData.title === "Member Exists") {
            // If email is already in the list
            return res
                .status(400)
                .json({error: "This email is already subscribed to the list."});
        }

        if (response.status >= 400) {
            const errorData = await response.json();
            return res.status(400).json({error: errorData.detail});
        }

        // If tags are provided, add tags to the subscriber
        if (tags && tags.length > 0) {
            const memberId = Buffer.from(email.toLowerCase()).toString("hex"); // MD5 hash of the email
            const tagUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${memberId}/tags`;

            const tagData = {
                tags: tags.map((tag) => ({name: tag, status: "active"})),
            };

            await fetch(tagUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${base64ApiKey}`,
                },
                body: JSON.stringify(tagData),
            });
        }

        return res.status(201).json({message: "Successfully subscribed!"});
    } catch (error) {
        return res.status(500).json({
            error:
                "Your e-mail is already a list member" ||
                "An unexpected error occurred.",
        });
    }
}
