import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { MailtrapTransport } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Mailtrap con API Token
const createTransporter = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const token = isProduction
    ? process.env.MAILTRAP_API_TOKEN
    : process.env.MAILTRAP_SANDBOX_TOKEN;

  const config = {
    token: token,
  };

  // En desarrollo, usar sandbox con testInboxId
  if (!isProduction) {
    config.sandbox = true;
    config.testInboxId = parseInt(process.env.MAILTRAP_TEST_INBOX_ID || '4357490');
  }

  return nodemailer.createTransport(MailtrapTransport(config));
};

// PROTECCIÓN ANTI-BOT
function validateSubmission(body, startTime) {
  // Honeypot
  if (body.website) {
    return { valid: false, error: 'Error de validación' };
  }

  // Tiempo mínimo (3 segundos)
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
    // Validación anti-bot
    const validation = validateSubmission(req.body, startTime);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error
      });
    }

    const { firstName, lastName, email, subject, message } = req.body;

    // Validar campos requeridos
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Crear el transporter
    const transporter = createTransporter();

    // Configurar el remitente
    const fromName = `${firstName} ${lastName}`;
    const companyEmail = process.env.COMPANY_EMAIL;

    const sender = {
      address: process.env.MAILTRAP_FROM_EMAIL || companyEmail,
      name: process.env.COMPANY_NAME || "Formulario Web",
    };

    // Configurar el email
    const mailOptions = {
      from: sender,
      to: [companyEmail],
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      category: "Contact Form",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 0;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
              padding: 16px;
              background: white;
              border-radius: 8px;
              border-left: 4px solid #667eea;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .label {
              font-weight: 600;
              color: #667eea;
              margin-bottom: 8px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value {
              color: #1f2937;
              font-size: 16px;
            }
            .value a {
              color: #667eea;
              text-decoration: none;
            }
            .value a:hover {
              text-decoration: underline;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #764ba2;
              margin-top: 20px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .message-content {
              color: #374151;
              font-size: 15px;
              line-height: 1.7;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding: 20px;
              color: #6b7280;
              font-size: 13px;
              border-top: 1px solid #e5e7eb;
            }
            .reply-button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 24px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Nombre</div>
              <div class="value">${fromName}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📝 Asunto</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="message-box">
              <div class="label">💬 Mensaje</div>
              <div class="message-content">${message}</div>
            </div>
            
            <center>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-button">
                Responder a ${firstName}
              </a>
            </center>
            
            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de tu sitio web</p>
              <p>Puedes responder directamente usando el botón de arriba</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NUEVO MENSAJE DE CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nombre: ${fromName}
📧 Email: ${email}
📝 Asunto: ${subject}

💬 Mensaje:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para responder, utiliza: ${email}
      `,
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Email enviado de: ${email}`);
    console.log(`📬 Message ID: ${info.messageId}`);

    res.json({
      success: true,
      message: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('❌ Error al enviar el mensaje:', error);
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
          color: white;
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
        .env-status {
          margin-top: 20px;
          padding: 15px;
          background: #fef3c7;
          border-radius: 5px;
          border-left: 4px solid #f59e0b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📧 Contact Form API - Toscamare</h1>
        <p class="status">✅ Servidor funcionando correctamente</p>
        
        <div class="env-status">
          <strong>🌍 Entorno:</strong> ${process.env.NODE_ENV || 'development'}<br>
          <strong>📮 Email empresa:</strong> ${process.env.COMPANY_EMAIL || 'No configurado'}<br>
          <strong>🔑 Token activo:</strong> ${process.env.NODE_ENV === 'production' ? 'Producción' : 'Sandbox (Testing)'}
        </div>
        
        <h2>Endpoints disponibles:</h2>
        
        <div class="endpoint">
          <strong>POST</strong> /api/contact
          <br><small>Enviar mensaje de contacto (usado por el frontend)</small>
        </div>
        
        <div class="endpoint">
          <strong>GET</strong> <a href="/test-email">/test-email</a>
          <br><small>Probar envío de email a Mailtrap</small>
        </div>
        
        <div class="endpoint">
          <strong>GET</strong> <a href="/health">/health</a>
          <br><small>Estado del servidor</small>
        </div>
        
        <hr>
        
        <h2>🧪 Prueba rápida:</h2>
        <p>Haz clic en <a href="/test-email">/test-email</a> para enviar un email de prueba.</p>
        <p><strong>En desarrollo:</strong> El email aparecerá en tu inbox de Mailtrap.</p>
        <p><strong>En producción:</strong> El email se enviará realmente a ${process.env.COMPANY_EMAIL}.</p>
        
        <hr>
        <p style="text-align: center; color: #666; font-size: 14px;">
          Powered by Mailtrap 📧 | Toscamare
        </p>
      </div>
    </body>
    </html>
  `);
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Contact Form API - Mailtrap',
    environment: process.env.NODE_ENV || 'development',
    company: process.env.COMPANY_NAME
  });
});

// Endpoint para probar
app.get('/test-email', async (req, res) => {
  try {
    const transporter = createTransporter();

    const sender = {
      address: process.env.MAILTRAP_FROM_EMAIL || process.env.COMPANY_EMAIL,
      name: process.env.COMPANY_NAME || "Test",
    };

    await transporter.sendMail({
      from: sender,
      to: [process.env.COMPANY_EMAIL],
      subject: `🧪 Test Mailtrap - ${process.env.NODE_ENV === 'production' ? 'PRODUCCIÓN' : 'DESARROLLO'}`,
      category: 'Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
          <h1 style="color: white; text-align: center; margin: 0;">✅ ¡Mailtrap funciona!</h1>
          <div style="background: white; padding: 30px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 16px; color: #333;">Si estás leyendo este email, tu configuración de Mailtrap está correcta.</p>
            <p style="color: #666;">Entorno: <strong>${process.env.NODE_ENV === 'production' ? 'PRODUCCIÓN' : 'DESARROLLO'}</strong></p>
            <p style="color: #666;">Ahora puedes recibir emails de tu formulario de contacto.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 14px; color: #999; text-align: center;">Enviado desde Contact Form API - Toscamare</p>
          </div>
        </div>
      `,
      text: `✅ Mailtrap funciona!\n\nEntorno: ${process.env.NODE_ENV === 'production' ? 'PRODUCCIÓN' : 'DESARROLLO'}\n\nSi recibes este email, todo está configurado correctamente.`,
    });

    res.json({
      success: true,
      message: `Email de prueba enviado. ${process.env.NODE_ENV === 'production' ? 'Revisa tu bandeja de entrada.' : 'Revisa tu inbox de Mailtrap.'}`
    });
  } catch (error) {
    console.error('Error en test:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  📧 CONTACT FORM API - TOSCAMARE                           ║
╚════════════════════════════════════════════════════════════╝

✅ Servidor: http://localhost:${PORT}
🌍 Entorno: ${process.env.NODE_ENV || 'development'}
📮 Email: ${process.env.COMPANY_EMAIL || 'No configurado'}
🔑 Token: ${process.env.NODE_ENV === 'production' ? 'Producción' : 'Sandbox (Testing)'}

Endpoints:
  POST /api/contact
  GET  /health
  GET  /test-email
  GET  /
  `);
});