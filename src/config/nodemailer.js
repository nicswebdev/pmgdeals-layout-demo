import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "sng119.arandomserver.com",
    port: 465,
    secure: true,
    auth: {
        user: "hello@pmgdeals.com",
        pass: "hello@2022",
    },
});

export const mailOptions = {
    from: "hello@pmgdeals.com",
    to: "hello@pmgdeals.com",
    // to: "nicholas.pratamasoe@gmail.com",
};
