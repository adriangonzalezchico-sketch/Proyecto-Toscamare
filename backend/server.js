import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendContactEmail } from './services/mailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Verificación de configuración en el arranque
console.log('--- Comprobación de Configuración (Render) ---');
console.log('EMAIL_PEDIDOS:', process.env.EMAIL_PEDIDOS ? '✅ Presente' : '❌ FALTA');
console.log('PASSWORD_PEDIDOS:', process.env.PASSWORD_PEDIDOS ? '✅ Presente' : '❌ FALTA');
console.log('EMAIL_CONTACTO:', process.env.EMAIL_CONTACTO ? '✅ Presente' : '❌ FALTA');
console.log('PASSWORD_CONTACTO:', process.env.PASSWORD_CONTACTO ? '✅ Presente' : '❌ FALTA');
console.log('-------------------------------------------');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting (descomentar cuando instales express-rate-limit):
// import rateLimit from 'express-rate-limit';
// const contactLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 5,                    // max 5 peticiones por IP
//   message: { success: false, message: 'Demasiados intentos. Inténtalo de nuevo más tarde.' },
// });
// app.use('/api/contact', contactLimiter);

// Log uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err?.stack || err);
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err?.stack || err);
});

// --- Utilidades ---

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

function validateSubmission(body, startTime) {
  // Anti-bot: honeypot
  if (body.website) {
    return { valid: false, error: 'Error de validación' };
  }
  // Anti-bot: tiempo mínimo
  const timeElapsed = Date.now() - startTime;
  if (timeElapsed < 1000) {
    return { valid: false, error: 'Por favor, tómate un momento para completar el formulario' };
  }
  return { valid: true };
}

// --- Endpoints ---

app.post('/api/contact', async (req, res) => {
  const startTime = req.body.formLoadTime || Date.now();

  try {
    console.log(`[REQ] Incoming ${req.body.formType || 'unknown'} request from ${req.body.email || 'unknown'}`);
    console.log('[DEBUG] Full Body:', JSON.stringify(req.body, null, 2));

    const validation = validateSubmission(req.body, startTime);
    if (!validation.valid) {
      console.warn(`[VALIDATION FAILED] ${validation.error} | IP: ${req.ip}`);
      return res.status(400).json({ success: false, message: validation.error });
    }

    const formType = req.body.formType || 'contacto';
    const selectedProducts = req.body.selectedProducts || [];
    const fullName = sanitize(req.body.fullName);
    const companyName = sanitize(req.body.companyName);
    const email = sanitize(req.body.email);
    const phone = sanitize(req.body.phone);
    const subject = sanitize(req.body.subject);
    const message = sanitize(req.body.message);
    const deliveryMethod = sanitize(req.body.deliveryMethod);
    const selectedStore = sanitize(req.body.selectedStore);

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios son requeridos',
      });
    }

    const info = await sendContactEmail({ 
      formType, 
      fullName, 
      companyName, 
      email, 
      phone, 
      subject, 
      message, 
      selectedProducts,
      deliveryMethod,
      selectedStore
    });

    console.log(`[OK] Email (${formType}) enviado de: ${email} | MessageId: ${info.messageId}`);

    res.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('[ERROR] al enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Contact Form API - Toscamare',
    departments: ['pedidos', 'contacto']
  });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contact Form API - Toscamare</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { background: white; color: #333; padding: 40px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        h1 { color: #667eea; }
        .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
        .status { color: #10b981; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Contact Form API - Toscamare</h1>
        <p class="status">Servidor funcionando correctamente</p>
        <h2>Endpoints disponibles:</h2>
        <div class="endpoint">
          <strong>POST</strong> /api/contact
          <br><small>Enviar mensaje de contacto</small>
        </div>
        <div class="endpoint">
          <strong>GET</strong> <a href="/health">/health</a>
          <br><small>Estado del servidor</small>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`
  =============================================
    CONTACT FORM API - TOSCAMARE (Nodemailer)
  =============================================

  Servidor:      http://localhost:${PORT}
  Departamentos: Pedidos y Administración/Contacto

  Endpoints:
    GET  /              - Pagina de inicio
    POST /api/contact   - Enviar formulario
    GET  /health        - Estado del servidor
  `);
});
