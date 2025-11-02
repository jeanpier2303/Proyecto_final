from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputFile
from telegram.ext import (
    ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler,
    ConversationHandler, ContextTypes, filters
)
import requests, os, io, traceback, qrcode
from fpdf import FPDF
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# --- ESTADOS DE CONVERSACIÓN ---
PRODUCT, QUANTITY, PAYMENT = range(3)

# --- CONFIGURACIÓN ---
API_URL = "http://127.0.0.1:8001"
BOT_TOKEN = "8458014740:AAFCypDYWN7_w4PC2rbrc6Vsga91RA7ODek"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
MAX_CANTIDAD = 10
COSTO_ENVIO = 4000
IVA = "Incluido"
BANCO = "Davivienda"
TITULAR = "Dairon S.A.S"

# ---------------------------------------------------------------------
# Función para crear el PDF de la factura
# ---------------------------------------------------------------------
def generar_factura_pdf(user, producto, cantidad, total):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=12)

    pdf.cell(200, 10, "FACTURA ELECTRÓNICA", ln=True, align="C")
    pdf.set_font("Helvetica", size=10)
    pdf.cell(200, 10, f"No. KAH-{user['id']}", ln=True, align="C")

    pdf.ln(8)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(200, 10, "Datos del Cliente", ln=True)
    pdf.set_font("Helvetica", size=10)
    pdf.cell(200, 8, f"{user['first_name']} {user['last_name']}", ln=True)
    pdf.cell(200, 8, f"Correo: {user['email']}", ln=True)

    pdf.ln(10)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(200, 10, "Detalle del pedido", ln=True)
    pdf.set_font("Helvetica", size=10)
    pdf.cell(200, 8, f"Producto: {producto.get('name') or producto.get('nombre')}", ln=True)
    pdf.cell(200, 8, f"Cantidad: {cantidad}", ln=True)
    pdf.cell(200, 8, f"Precio unitario: ${producto.get('price') or producto.get('precio')}", ln=True)
    pdf.cell(200, 8, f"Subtotal: ${total - COSTO_ENVIO:.2f}", ln=True)
    pdf.cell(200, 8, f"IVA: {IVA}", ln=True)
    pdf.cell(200, 8, f"Envío: ${COSTO_ENVIO:.2f}", ln=True)
    pdf.cell(200, 8, f"Total: ${total:.2f}", ln=True)

    pdf.ln(12)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(200, 10, "Información Bancaria", ln=True)
    pdf.set_font("Helvetica", size=10)
    pdf.cell(200, 8, f"Banco: {BANCO}", ln=True)
    pdf.cell(200, 8, f"Titular: {TITULAR}", ln=True)

    # --- Código QR de la factura ---
    qr_data = f"Pago confirmado por {user['first_name']} - Total: ${total:.2f}"
    qr_img = qrcode.make(qr_data)
    qr_path = f"factura_qr_{user['id']}.png"
    qr_img.save(qr_path)
    pdf.image(qr_path, x=160, y=220, w=30)

    pdf_output = io.BytesIO(pdf.output(dest="S"))
    os.remove(qr_path)
    return pdf_output

# ---------------------------------------------------------------------
# Inicio del flujo
# ---------------------------------------------------------------------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    args = context.args
    if not args:
        keyboard = [[InlineKeyboardButton("🔐 Iniciar sesión", url=f"{FRONTEND_URL}/login")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(
            " No se reconocen tus credenciales.\n\n"
            "Por favor inicia sesión desde tu cuenta para continuar 👇",
            reply_markup=reply_markup
        )
        return ConversationHandler.END

    user_id = args[0]
    try:
        # Obtener usuario
        user = requests.get(f"{API_URL}/api/auth/usuarios/{user_id}").json()
        context.user_data["user"] = user

        await update.message.reply_text(
            f"👋 ¡Hola {user['first_name']}! Bienvenido a *KAHUA* 🥭\n\n"
            "Estos son los productos disponibles:"
        )

        # Obtener productos
        productos = requests.get(f"{API_URL}/api/productos/").json()[:10]
        context.user_data["productos"] = productos

        lista = "\n".join([
            f"{p['id']}. {p.get('name') or p.get('nombre')} - ${p.get('price') or p.get('precio')}"
            for p in productos
        ])
        
        # --- Enviar imagen de bienvenida ---
        with open("app/bot/assets/Carrusel-2.png", "rb") as photo:
            await update.message.reply_photo(
                photo=photo,
                caption=(
                    "🥭 *Bienvenido a KAHUA* 🥭\n\n"
                    "Elige uno de nuestros deliciosos jugos naturales 🍹"
                ),
                parse_mode="Markdown"
            )

        await update.message.reply_text(f"{lista}\n\n👉 Escribe el número del producto que deseas.")
        return PRODUCT

    except Exception as e:
        traceback.print_exc()
        await update.message.reply_text(f"Error al iniciar: {e}")
        return ConversationHandler.END

# ---------------------------------------------------------------------
async def get_product(update: Update, context: ContextTypes.DEFAULT_TYPE):
    texto = update.message.text.strip()
    if not texto.isdigit():
        await update.message.reply_text("⚠️ Escribe un número válido de producto.")
        return PRODUCT

    producto_id = int(texto)
    productos = context.user_data["productos"]
    producto = next((p for p in productos if int(p["id"]) == producto_id), None)
    if not producto:
        await update.message.reply_text("❌ Opción no válida. Intenta de nuevo.")
        return PRODUCT

    context.user_data["producto"] = producto
    await update.message.reply_text(
        f"Has elegido *{producto.get('name') or producto.get('nombre')}* 🍹\n"
        f"¿Cuántas unidades deseas? (Máximo {MAX_CANTIDAD})"
    )
    return QUANTITY

# ---------------------------------------------------------------------
async def get_quantity(update: Update, context: ContextTypes.DEFAULT_TYPE):
    texto = update.message.text.strip()
    if not texto.isdigit():
        await update.message.reply_text("⚠️ Escribe una cantidad válida.")
        return QUANTITY

    cantidad = int(texto)
    if cantidad <= 0 or cantidad > MAX_CANTIDAD:
        await update.message.reply_text(f"Solo puedes pedir entre 1 y {MAX_CANTIDAD} unidades.")
        return QUANTITY

    producto = context.user_data["producto"]
    user = context.user_data["user"]

    price = float(producto.get("price") or producto.get("precio"))
    total = (price * cantidad) + COSTO_ENVIO

    context.user_data["cantidad"] = cantidad
    context.user_data["total"] = total

    # Generar QR de pago
    qr_data = f"Transferencia a {TITULAR} ({BANCO}) - Total: ${total:.2f}"
    qr_img = qrcode.make(qr_data)
    qr_path = f"pago_{user['id']}.png"
    qr_img.save(qr_path)

    with open(qr_path, "rb") as qr_file:
        keyboard = [[InlineKeyboardButton("✅ Continuar", callback_data="continuar_pago")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_photo(
            photo=qr_file,
            caption=(
                f"💳 Método de pago: Transferencia Bancaria\n\n"
                f"Banco: {BANCO}\nTitular: {TITULAR}\n\n"
                f"Total a pagar: ${total:.2f}\n\n"
                "Escanea este código QR para realizar tu pago 👇"
            ),
            reply_markup=reply_markup
        )

    os.remove(qr_path)
    return PAYMENT

# ---------------------------------------------------------------------
async def continuar_pago(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    user = context.user_data["user"]
    producto = context.user_data["producto"]
    cantidad = context.user_data["cantidad"]
    total = context.user_data["total"]

    # Registrar pedido en backend
    # Registrar pedido en backend
    pedido = {
        "user_id": user["id"],
        "address_id": 1,
        "status_id": 4,  # Pagado
        "subtotal": total - COSTO_ENVIO,
        "shipping": COSTO_ENVIO,
        "tax": 0,
        "total": total,
        "note": "Pago completado vía transferencia",
        "items": [
            {
                "product_id": producto["id"],
                "qty": cantidad,
                "unit_price": float(producto.get("price") or producto.get("precio")),
                "subtotal": float(producto.get("price") or producto.get("precio")) * cantidad
            }
        ]
    }
    requests.post(f"{API_URL}/orders", json=pedido)


    # Generar factura
    pdf_output = generar_factura_pdf(user, producto, cantidad, total)
    factura_file = InputFile(pdf_output, filename="factura_kahua.pdf")

    await query.message.reply_document(
        document=factura_file,
        caption="🧾 Aquí tienes tu factura electrónica.\n¡Gracias por tu compra en KAHUA! 🥭"
    )
    return ConversationHandler.END

# ---------------------------------------------------------------------
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🚪 Pedido cancelado. Usa /start para comenzar de nuevo.")
    return ConversationHandler.END

# ---------------------------------------------------------------------
def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            PRODUCT: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_product)],
            QUANTITY: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_quantity)],
            PAYMENT: [CallbackQueryHandler(continuar_pago, pattern="continuar_pago")],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    app.add_handler(conv_handler)
    print("🤖 Bot de KAHUA corriendo y listo para recibir pedidos...")
    app.run_polling()

if __name__ == "__main__":
    main()
