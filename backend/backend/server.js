import express from 'express';
import cors from 'cors';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Mailgun
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
  // Si tu dominio es EU, descomenta esta línea:
  // url: "https://api.eu.mailgun.net"
});

// PROTECCIÓN ANTI-BOT
function validateSubmission(body, startTime) {
  if (body.website) {
    return { valid: false, error: 'Error de validación' };
  }

  const timeElapsed = Date.now() - startTime;
  if (timeElapsed < 3000) {
    return { valid: false, error: 'Por favor, tómate un momento para completar el formulario' };
  }

  return { valid: true };
}

// Endpoint para enviar el formulario
app.post('/api/contact', async (req, res) => {
  const startTime = req.body.formLoadTime || Date.now();

  try {
    const validation = validateSubmission(req.body, startTime);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error
      });
    }

    const { firstName, lastName, email, subject, message } = req.body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const fromName = `${firstName} ${lastName}`;

    // Enviar con Mailgun
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${process.env.COMPANY_NAME} <${process.env.MAILGUN_FROM_EMAIL}>`,
      to: [process.env.COMPANY_EMAIL],
      "h:Reply-To": email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              margin: 20px;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
              padding: 16px;
              background: #f9fafb;
              border-radius: 8px;
              border-left: 4px solid #667eea;
            }
            .label {
              font-weight: 600;
              color: #667eea;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
            }
            .value {
              color: #1f2937;
              font-size: 16px;
            }
            .value a {
              color: #667eea;
              text-decoration: none;
            }
            .message-box {
              background: #f0f4ff;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #764ba2;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #6b7280;
              font-size: 12px;
              border-top: 1px solid #e5e7eb;
            }
            .reply-button {
              display: inline-block;
              margin: 20px 0;
              padding: 12px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nuevo Mensaje de Contacto</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nombre Completo</div>
                <div class="value">${fromName}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email de Contacto</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📝 Asunto</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="message-box">
                <div class="label">💬 Mensaje</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              
              <center>
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-button">
                  Responder a ${firstName}
                </a>
              </center>
              
              <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto de Toscamare</p>
                <p>Para responder, haz clic en el botón de arriba o responde directamente a este email</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NUEVO MENSAJE DE CONTACTO - TOSCAMARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nombre: ${fromName}
📧 Email: ${email}
📝 Asunto: ${subject}

💬 Mensaje:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para responder, utiliza: ${email}
      `,
    });

    console.log(`✅ Email enviado de: ${email}`);
    console.log(`📬 Message ID: ${data.id}`);

    res.json({
      success: true,
      message: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('❌ Error al enviar:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
    });
  }
});

// Página de inicio
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contact Form API - Toscamare</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 800px; 
          margin: 50px auto; 
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          background: white;
          color: #333;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; }
        .endpoint {
          background: #f5f5f5;
          padding: 15px;
          margin: 10px 0;
          border-radius: 5px;
          border-left: 4px solid #667eea;
        }
        .status { color: #10b981; font-weight: bold; }
        a { color: #667eea; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📧 Contact Form API - Toscamare</h1>
        <p class="status">✅ Servidor funcionando correctamente</p>
        
        <div class="warning">
          <strong>⚙️ Configuración:</strong><br>
          Email destino: ${process.env.COMPANY_EMAIL || 'No configurado'}<br>
          Dominio Mailgun: ${process.env.MAILGUN_DOMAIN || 'No configurado'}
        </div>
        
        <h2>Endpoints disponibles:</h2>
        <div class="endpoint">
          <strong>POST</strong> /api/contact
          <br><small>Enviar mensaje de contacto (usado por el frontend)</small>
        </div>
        <div class="endpoint">
          <strong>GET</strong> <a href="/test-email">/test-email</a>
          <br><small>Probar envío de email con Mailgun</small>
        </div>
        <div class="endpoint">
          <strong>GET</strong> <a href="/health">/health</a>
          <br><small>Estado del servidor</small>
        </div>
        
        <hr>
        <p><a href="/test-email">🧪 Probar envío de email</a></p>
        <p style="font-size: 14px; color: #666;">El email llegará a: ${process.env.COMPANY_EMAIL}</p>
      </div>
    </body>
    </html>
  `);
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Contact Form API - Toscamare (Mailgun)',
    destination: process.env.COMPANY_EMAIL
  });
});

// Endpoint de prueba
app.get('/test-email', async (req, res) => {
  try {
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${process.env.COMPANY_NAME} <${process.env.MAILGUN_FROM_EMAIL}>`,
      to: [process.env.COMPANY_EMAIL],
      subject: "🧪 Test de Mailgun - ¡Funciona!",
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
          <h1 style="color: white; text-align: center; margin: 0;">✅ ¡Mailgun funciona!</h1>
          <div style="background: white; padding: 30px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 16px; color: #333;">Si estás leyendo este email en tu Outlook, tu configuración de Mailgun está correcta.</p>
            <p style="color: #666;">Los emails del formulario de contacto llegarán directamente a: <strong>${process.env.COMPANY_EMAIL}</strong></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 14px; color: #999; text-align: center;">Toscamare - Contact Form API</p>
          </div>
        </div>
      `,
      text: `✅ ¡Mailgun funciona!\n\nSi recibes este email, todo está configurado correctamente.\nLos emails llegarán a: ${process.env.COMPANY_EMAIL}`,
    });

    console.log('✅ Email de prueba enviado:', data.id);

    res.json({
      success: true,
      message: `Email enviado a ${process.env.COMPANY_EMAIL}. Revisa tu bandeja de entrada de Outlook.`,
      messageId: data.id
    });
  } catch (error) {
    console.error('❌ Error en test:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  📧 CONTACT FORM API - TOSCAMARE (MAILGUN)                 ║
╚════════════════════════════════════════════════════════════╝

✅ Servidor: http://localhost:${PORT}
📮 Email destino: ${process.env.COMPANY_EMAIL || 'NO CONFIGURADO'}
🌐 Dominio Mailgun: ${process.env.MAILGUN_DOMAIN || 'NO CONFIGURADO'}

⚠️  Los emails llegarán DIRECTAMENTE a tu Outlook
    (no sandbox, emails reales)

Endpoints:
  GET  /              - Página de inicio
  POST /api/contact   - Enviar formulario
  GET  /test-email    - Probar email REAL
  GET  /health        - Estado del servidor
  `);
});