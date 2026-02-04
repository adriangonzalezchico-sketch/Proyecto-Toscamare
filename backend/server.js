import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Mailtrap con SMTP (mucho más simple)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
    port: process.env.MAILTRAP_PORT || 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });
};

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

    const transporter = createTransporter();
    const fromName = `${firstName} ${lastName}`;

    const mailOptions = {
      from: `"${process.env.COMPANY_NAME}" <${process.env.MAILTRAP_FROM_EMAIL}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
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
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
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
              font-size: 14px;
              text-transform: uppercase;
            }
            .value {
              color: #1f2937;
              font-size: 16px;
              margin-top: 5px;
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
            <div class="field">
              <div class="label">💬 Mensaje</div>
              <div class="value">${message}</div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
NUEVO MENSAJE DE CONTACTO

Nombre: ${fromName}
Email: ${email}
Asunto: ${subject}

Mensaje:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Email enviado de: ${email}`);

    res.json({
      success: true,
      message: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('❌ Error:', error);
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
      </style>
    </head>
    <body>
      <div class="container">
        <h1>📧 Contact Form API - Toscamare</h1>
        <p class="status">✅ Servidor funcionando correctamente</p>
        <p>📮 Email: ${process.env.COMPANY_EMAIL}</p>
        
        <h2>Endpoints disponibles:</h2>
        <div class="endpoint">
          <strong>POST</strong> /api/contact
        </div>
        <div class="endpoint">
          <strong>GET</strong> <a href="/test-email">/test-email</a>
        </div>
        <div class="endpoint">
          <strong>GET</strong> <a href="/health">/health</a>
        </div>
        
        <hr>
        <p><a href="/test-email">🧪 Probar envío de email</a></p>
      </div>
    </body>
    </html>
  `);
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Contact Form API - Toscamare'
  });
});

// Endpoint de prueba
app.get('/test-email', async (req, res) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME}" <${process.env.MAILTRAP_FROM_EMAIL}>`,
      to: process.env.COMPANY_EMAIL,
      subject: "🧪 Test de Mailtrap - ¡Funciona!",
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
          <h1 style="color: white; text-align: center;">✅ ¡Mailtrap funciona!</h1>
          <div style="background: white; padding: 30px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 16px; color: #333;">Si estás leyendo este email, tu configuración SMTP de Mailtrap está correcta.</p>
            <p style="color: #666;">Ahora puedes recibir emails de tu formulario de contacto.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 14px; color: #999; text-align: center;">Toscamare - Contact Form API</p>
          </div>
        </div>
      `,
      text: "✅ ¡Mailtrap funciona! Si recibes este email, todo está configurado correctamente.",
    });

    res.json({
      success: true,
      message: 'Email de prueba enviado. Revisa tu inbox de Mailtrap.'
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
║  📧 CONTACT FORM API - TOSCAMARE (SMTP)                    ║
╚════════════════════════════════════════════════════════════╝

✅ Servidor: http://localhost:${PORT}
📮 Email: ${process.env.COMPANY_EMAIL || 'No configurado'}
🔑 SMTP Host: ${process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io'}

Endpoints:
  GET  /              - Página de inicio
  POST /api/contact   - Enviar formulario
  GET  /test-email    - Probar email
  GET  /health        - Estado del servidor
  `);
});