import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

/**
 * Envía el email de contacto a la empresa.
 * @param {{ fullName: string, companyName?: string, email: string, phone?: string, subject: string, message: string }} data
 */
export async function sendContactEmail({ fullName, companyName, email, phone, subject, message }) {
  const info = await transporter.sendMail({
    from: `"Toscamare" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    replyTo: email,
    subject: `Nuevo mensaje desde la web Toscamare: ${subject}`,
    text: buildPlainText({ fullName, companyName, email, phone, subject, message }),
    html: buildHtml({ fullName, companyName, email, phone, subject, message }),
  });

  return info;
}

function buildPlainText({ fullName, companyName, email, phone, subject, message }) {
  return `
NUEVO MENSAJE DE CONTACTO - TOSCAMARE
--------------------------------------

Nombre: ${fullName}${companyName ? `\nEmpresa: ${companyName}` : ''}
Email: ${email}${phone ? `\nTelefono: ${phone}` : ''}
Asunto: ${subject}

Mensaje:
${message}

--------------------------------------
Para responder, utiliza: ${email}
  `.trim();
}

function buildHtml({ fullName, companyName, email, phone, subject, message }) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px 30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:600;">Nuevo Mensaje de Contacto</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">

              <!-- Nombre -->
              <div style="margin-bottom:20px; padding:16px; background:#f9fafb; border-radius:8px; border-left:4px solid #667eea;">
                <div style="font-weight:600; color:#667eea; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Nombre Completo</div>
                <div style="color:#1f2937; font-size:16px;">${fullName}</div>
              </div>

              ${companyName ? `
              <!-- Empresa -->
              <div style="margin-bottom:20px; padding:16px; background:#f9fafb; border-radius:8px; border-left:4px solid #667eea;">
                <div style="font-weight:600; color:#667eea; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Entidad / Empresa</div>
                <div style="color:#1f2937; font-size:16px;">${companyName}</div>
              </div>
              ` : ''}

              <!-- Email -->
              <div style="margin-bottom:20px; padding:16px; background:#f9fafb; border-radius:8px; border-left:4px solid #667eea;">
                <div style="font-weight:600; color:#667eea; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Email de Contacto</div>
                <div style="color:#1f2937; font-size:16px;"><a href="mailto:${email}" style="color:#667eea; text-decoration:none;">${email}</a></div>
              </div>

              ${phone ? `
              <!-- Telefono -->
              <div style="margin-bottom:20px; padding:16px; background:#f9fafb; border-radius:8px; border-left:4px solid #667eea;">
                <div style="font-weight:600; color:#667eea; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Telefono</div>
                <div style="color:#1f2937; font-size:16px;">${phone}</div>
              </div>
              ` : ''}

              <!-- Asunto -->
              <div style="margin-bottom:20px; padding:16px; background:#f9fafb; border-radius:8px; border-left:4px solid #667eea;">
                <div style="font-weight:600; color:#667eea; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Asunto</div>
                <div style="color:#1f2937; font-size:16px;">${subject}</div>
              </div>

              <!-- Mensaje -->
              <div style="margin-bottom:20px; padding:20px; background:#f0f4ff; border-radius:8px; border-left:4px solid #764ba2;">
                <div style="font-weight:600; color:#764ba2; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensaje</div>
                <div style="color:#1f2937; font-size:16px; white-space:pre-wrap;">${message}</div>
              </div>

              <!-- Boton Responder -->
              <div style="text-align:center; margin:25px 0;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block; padding:12px 30px; background:#667eea; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:500; font-size:14px;">
                  Responder a ${fullName}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center; padding:20px; color:#6b7280; font-size:12px; border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 5px 0;">Este mensaje fue enviado desde el formulario de contacto de Toscamare</p>
              <p style="margin:0;">Para responder, haz clic en el boton de arriba o responde directamente a este email</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
