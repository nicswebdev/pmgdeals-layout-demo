// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {mailOptions, transporter} from "@/config/nodemailer";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;
        if (
            !data.name ||
            !data.email ||
            // !data.phone ||
            // !data.reason ||
            !data.message
        ) {
            return res.status(400).json({message: "Bad Request"});
        }

        try {
            // await transporter.sendMail({
            //     ...mailOptions,
            //     subject: "New Contact",
            //     text: "Contact Form",
            //     replyTo: data.email,
            //     html:
            //         "<p>Name: " +
            //         data.name +
            //         "</p><p>Email: " +
            //         data.email +
            //         "</p><p>Phone: " +
            //         data.phone +
            //         "</p><p>Reason: <br>" +
            //         data.reason +
            //         "</p><p>Message: <br>" +
            //         data.message +
            //         "</p>",
            // });

            await transporter.sendMail({
                ...mailOptions,
                subject: "New Contact",
                text: "Contact Form",
                replyTo: data.email,
                html:
                    "<p>Name: " +
                    data.name +
                    "</p><p>Email: " +
                    data.email +
                    "</p><p>Message: <br>" +
                    data.message +
                    "</p>",
            });

            return res.status(200).json({success: true});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: error.message});
        }
    }
    return res.status(400).json({message: "Bad Request"});
};

export default handler;
