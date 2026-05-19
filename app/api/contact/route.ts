import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    /* ─────────────────────────────────────────────
       Email sending via mailto redirect (fallback).
       Replace with Resend/SMTP when ready:

       import { Resend } from 'resend';
       const resend = new Resend(process.env.RESEND_API_KEY);
       await resend.emails.send({
         from: 'website@alnakheelvillage.com',
         to: 'info@alnakheelvillage.com',
         subject: `New Inquiry: ${subject}`,
         html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>${message}</p>`,
       });
    ───────────────────────────────────────────── */

    console.log("Contact form submission:", { name, email, phone, subject, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
