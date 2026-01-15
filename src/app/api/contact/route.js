import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Configure email transporter with your credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'veeruinfranag@gmail.com',
        pass: 'racr egsy abnd uqsp', // App password
      },
    });
    
    // Format email content
    const emailContent = `
      <h1>New Contact Form Submission</h1>
      <h2>Personal Information</h2>
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
      <p><strong>Company:</strong> ${formData.companyName || 'Not provided'}</p>
      
      <h2>Project Details</h2>
      <p><strong>Project Type:</strong> ${formData.projectType}</p>
      <p><strong>Budget:</strong> ${formData.budget || 'Not provided'}</p>
      <p><strong>Timeline:</strong> ${formData.timeline || 'Not provided'}</p>
      
      <h2>Message</h2>
      <p>${formData.message}</p>
    `;
    
    // Send email
    await transporter.sendMail({
      from: '"Veeru Engineering Website" <veeruinfranag@gmail.com>',
      to: "veeruinfranag@gmail.com", // Send only to this email
      subject: `New Project Enquiry from ${formData.fullName}`,
      html: emailContent,
      replyTo: formData.email,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}