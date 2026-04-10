import nodemailer from "nodemailer";

/**
 * Envía el email de contacto a la empresa.
 * @param {{ formType: string, fullName: string, companyName?: string, email: string, phone?: string, subject: string, message: string, selectedProducts: Array }} data
 */
export async function sendContactEmail({
  formType,
  fullName,
  companyName,
  email,
  phone,
  subject,
  message,
  selectedProducts,
  deliveryMethod,
  selectedStore,
}) {
  // Seleccionamos credenciales según el tipo de formulario
  const isPedido = formType === "pedidos";
  const senderEmail = isPedido
    ? process.env.EMAIL_PEDIDOS
    : process.env.EMAIL_CONTACTO;
  const senderPass = isPedido
    ? process.env.PASSWORD_PEDIDOS
    : process.env.PASSWORD_CONTACTO;

  if (!senderEmail || !senderPass) {
    console.error(`[CRITICAL] Faltan variables de entorno para ${formType}`);
    throw new Error("Configuración de correo incompleta en el servidor.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log(
    `[MAIL] Attempting to send ${formType} email from ${senderEmail} to ${senderEmail}...`
  );
  
  const mailSubject = isPedido
    ? `NUEVO PEDIDO: ${fullName}`
    : `Nuevo mensaje de contacto: ${subject}`;

  const info = await transporter.sendMail({
    from: `"Toscamare" <${senderEmail}>`,
    to: senderEmail,
    replyTo: email,
    subject: mailSubject,
    text: buildPlainText({
      formType,
      fullName,
      companyName,
      email,
      phone,
      subject,
      message,
      selectedProducts,
      deliveryMethod,
      selectedStore,
    }),
    html: buildHtml({
      formType,
      fullName,
      companyName,
      email,
      phone,
      subject,
      message,
      selectedProducts,
      deliveryMethod,
      selectedStore,
    }),
  });

  return info;
}

function buildPlainText({
  formType,
  fullName,
  companyName,
  email,
  phone,
  subject,
  message,
  selectedProducts,
  deliveryMethod,
  selectedStore,
}) {
  const isPedido = formType === "pedidos";
  let productsLine = "";

  if (isPedido && selectedProducts && selectedProducts.length > 0) {
    productsLine =
      "\nPRODUCTOS SOLICITADOS:\n" +
      selectedProducts
        .map(
          (p) =>
            `- ${p.quantity} ${p.unit || "Uds"} de ${p.name}${p.note ? ` (Nota: ${p.note})` : ""}`,
        )
        .join("\n") +
      "\n--------------------------------------\n";
  }

  const deliveryInfo = isPedido
    ? `
Método de Entrega: ${deliveryMethod === "domicilio" ? "Envío a domicilio" : `Recoger en tienda (${selectedStore || "No especificada"})`}
`
    : "";

  return `
${isPedido ? "NUEVO PEDIDO RECIBIDO" : "NUEVO MENSAJE DE CONTACTO"} - TOSCAMARE
--------------------------------------

Nombre: ${fullName}${companyName ? `\nEmpresa: ${companyName}` : ""}
Email: ${email}${phone ? `\nTelefono: ${phone}` : ""}
${isPedido ? "" : `Asunto: ${subject}`}
${deliveryInfo}${productsLine}
${isPedido ? "Comentarios:" : "Mensaje:"}
${message}

--------------------------------------
Para responder, utiliza: ${email}
  `.trim();
}

function buildHtml({
  formType,
  fullName,
  companyName,
  email,
  phone,
  subject,
  message,
  selectedProducts,
  deliveryMethod,
  selectedStore,
}) {
  const isPedido = formType === "pedidos";
  const accentColor = "#005bb7";
  const title = isPedido ? "Nuevo Pedido" : "Consulta de Contacto";

  let productsHtml = "";
  if (isPedido && selectedProducts && selectedProducts.length > 0) {
    productsHtml = `
      <div style="margin-bottom:20px; padding:20px; background:#f8fbff; border-radius:12px; border:1px solid #e1e8f0;">
        <div style="font-weight:700; color:${accentColor}; font-size:13px; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px; border-bottom:1px solid #e1e8f0; padding-bottom:8px;">
          Contenido del Pedido
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
          ${selectedProducts
            .map(
              (p) => `
            <tr>
              <td style="padding:10px 0; border-bottom:1px solid #f1f5f9; color:${accentColor}; font-weight:700; width:100px; vertical-align:top;">${p.quantity} ${p.unit || "Uds"}</td>
              <td style="padding:10px 0; border-bottom:1px solid #f1f5f9; color:#334155;">
                <div style="font-weight:600;">${p.name}</div>
                ${p.note ? `<div style="font-size:12px; color:#64748b; margin-top:4px;">Nota: ${p.note}</div>` : ""}
              </td>
            </tr>
          `,
            )
            .join("")}
        </table>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#fafafa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa; padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, ${accentColor} 0%, #7fbaf5 100%); padding:50px 30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:800; letter-spacing:0.5px;">${title}</h1>
              <p style="margin:10px 0 0; color:rgba(255,255,255,0.9); font-size:14px;">Notificación oficial - Toscamare</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px;">

              <div style="margin-bottom:20px; padding:18px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;">
                <div style="font-weight:700; color:${accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Información del Cliente</div>
                <div style="color:#1e293b; font-size:16px; font-weight:500;">
                  ${fullName} ${companyName ? `<span style="color:#64748b; font-weight:400; font-size:14px;">— ${companyName}</span>` : ""}
                </div>
              </div>

              <div style="display:flex; gap:15px; margin-bottom:20px;">
                <div style="flex:1; padding:15px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;">
                  <div style="font-weight:700; color:${accentColor}; font-size:10px; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Email</div>
                  <div style="color:#1e293b; font-size:14px;"><a href="mailto:${email}" style="color:${accentColor}; text-decoration:none;">${email}</a></div>
                </div>
                ${
                  phone
                    ? `
                <div style="flex:1; padding:15px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;">
                  <div style="font-weight:700; color:${accentColor}; font-size:10px; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Teléfono</div>
                  <div style="color:#1e293b; font-size:14px;">${phone}</div>
                </div>
                `
                    : ""
                }
              </div>

              ${
                isPedido
                  ? `
              <div style="margin-bottom:20px; padding:18px; background:#f0f7ff; border-radius:12px; border:1px solid #d1e5ff;">
                <div style="font-weight:700; color:${accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Método de Entrega</div>
                <div style="color:#1e293b; font-size:15px; font-weight:600;">
                  ${deliveryMethod === "domicilio" ? "🚚 Envío a domicilio" : `🏪 Recoger en tienda: ${selectedStore || "No especificada"}`}
                </div>
              </div>
              `
                  : `
              <div style="margin-bottom:20px; padding:18px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;">
                <div style="font-weight:700; color:${accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Asunto</div>
                <div style="color:#1e293b; font-size:15px;">${subject}</div>
              </div>
              `
              }

              ${productsHtml}

              <div style="margin-bottom:30px; padding:20px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;">
                <div style="font-weight:700; color:${accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">
                  ${isPedido ? "Observaciones del Pedido" : "Contenido del Mensaje"}
                </div>
                <div style="color:#334155; font-size:15px; white-space:pre-wrap; line-height:1.6;">${message || "No se han incluido comentarios adicionales."}</div>
              </div>

              <div style="text-align:center; margin:20px 0;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(isPedido ? "Confirmación de tu pedido Toscamare" : "Respuesta a tu consulta Toscamare")}" style="display:inline-block; padding:16px 45px; background:${accentColor}; color:#ffffff; text-decoration:none; border-radius:50px; font-weight:700; font-size:14px; text-transform:uppercase; letter-spacing:1px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
                  Responder directamente
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center; padding:20px; color:#9ca3af; font-size:11px; border-top:1px solid #f3f4f6; background-color: #fafbfc;">
              <p style="margin:0 0 5px 0;">TOSCAMARE - Gestión Automática de Formularios Web</p>
              <p style="margin:0;">Este correo es una notificación automática. No lo compartas con personas ajenas a la empresa.</p>
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
