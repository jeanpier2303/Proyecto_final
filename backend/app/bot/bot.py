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
TITULAR = "KAHUA Natural Drinks S.A.S"
LOGO_PATH = "app/bot/assets/logo_kahua.png"

# 📸 Diccionario de imágenes de productos (ajusta las rutas a tus archivos)
IMAGENES_PRODUCTOS = {
    1: "app/bot/assets/product_images/jugo_naranja.png",
    2: "app/bot/assets/product_images/jugo_mango.png",
    3: "app/bot/assets/product_images/jugo_maracuya.png",
    4: "app/bot/assets/product_images/jJugo_MangoGuayabaNaranja.png",
    5: "app/bot/assets/product_images/Jugo_Mango&Maracuyá.png",
    6: "app/bot/assets/product_images/jugo_pina.png",
}


# ---------------------------------------------------------------------
# Clase personalizada para la factura
# ---------------------------------------------------------------------
class FacturaPDF(FPDF):
    def header(self):
        if os.path.exists(LOGO_PATH):
            self.image(LOGO_PATH, 10, 8, 25)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(0, 80, 0)
        self.cell(0, 10, "KAHUA Natural Drinks S.A.S", align="C", new_x="LMARGIN", new_y="NEXT")
        self.set_font("Helvetica", "", 10)
        self.set_text_color(100, 100, 100)
        self.cell(0, 6, "Carrera 15 #123 - Bogotá | Tel: +57 300 123 4567", align="C", new_x="LMARGIN", new_y="NEXT")
        self.cell(0, 6, "kahua.naturaldrinks@gmail.com", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(10)

    def footer(self):
        self.set_y(-20)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Gracias por tu compra - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", align="C")


# ---------------------------------------------------------------------
# Función para crear el PDF de la factura
# ---------------------------------------------------------------------
def generar_factura_pdf(user, producto, cantidad, total):
    pdf = FacturaPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 10, f"Factura No. KAH-{user['id']}", align="R", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(8)

    pdf.set_fill_color(255, 230, 204)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 10, "Datos del Cliente", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 8, f"Nombre: {user['first_name']} {user['last_name']}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"Correo: {user['email']}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)

    pdf.set_fill_color(255, 230, 204)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 10, "Detalle del Pedido", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 8, f"Producto: {producto.get('name') or producto.get('nombre')}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"Cantidad: {cantidad}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"Precio unitario: ${float(producto.get('price') or producto.get('precio')):.2f}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"Subtotal: ${total - COSTO_ENVIO:.2f}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"IVA: {IVA}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"Costo de envío: ${COSTO_ENVIO:.2f}", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 10, f"TOTAL: ${total:.2f}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)

    pdf.set_fill_color(255, 230, 204)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 10, "Información Bancaria", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 8, f"Banco: {BANCO}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"Titular: {TITULAR}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(8)

    qr_data = f"Pago confirmado por {user['first_name']} - Total: ${total:.2f}"
    qr_img = qrcode.make(qr_data)
    qr_path = f"factura_qr_{user['id']}.png"
    qr_img.save(qr_path)
    pdf.image(qr_path, x=160, y=pdf.get_y(), w=30)
    os.remove(qr_path)

    # ✅ Corrección: FPDF devuelve bytearray, no se codifica
    pdf_output = io.BytesIO(pdf.output(dest="S"))
    return pdf_output


# ---------------------------------------------------------------------
# FLUJO PRINCIPAL DEL BOT
# ---------------------------------------------------------------------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    args = context.args
    if not args:
        keyboard = [[InlineKeyboardButton("🔐 Iniciar sesión", url=f"{FRONTEND_URL}/login")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(
            "⚠️ No se reconocen tus credenciales.\n\n"
            "Por favor inicia sesión desde tu cuenta para continuar 👇",
            reply_markup=reply_markup
        )
        return ConversationHandler.END

    user_id = args[0]
    try:
        user = requests.get(f"{API_URL}/api/auth/usuarios/{user_id}").json()
        context.user_data["user"] = user

        await update.message.reply_text(
            f"👋 ¡Hola {user['first_name']}! Bienvenido a *KAHUA* 🥭\n\n"
            "Estos son los productos disponibles:"
        )

        productos = requests.get(f"{API_URL}/api/productos/").json()[:10]
        context.user_data["productos"] = productos

        lista = "\n".join([
            f"{p['id']}. {p.get('name') or p.get('nombre')} - ${p.get('price') or p.get('precio')}"
            for p in productos
        ])

        with open("app/bot/assets/Carrusel-2.png", "rb") as photo:
            await update.message.reply_photo(
                photo=photo,
                caption="🥭 *Bienvenido a KAHUA* 🥭\n\nElige uno de nuestros deliciosos jugos naturales 🍹",
                parse_mode="Markdown"
            )

        await update.message.reply_text(f"{lista}\n\n Escribe el número del producto que deseas.")
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

    ruta_imagen = IMAGENES_PRODUCTOS.get(producto_id)
    if ruta_imagen and os.path.exists(ruta_imagen):
        with open(ruta_imagen, "rb") as img:
            await update.message.reply_photo(
                photo=img,
                caption=f"🍹 *{producto.get('name') or producto.get('nombre')}* seleccionado.",
                parse_mode="Markdown"
            )

    keyboard = [[InlineKeyboardButton("❌ Cancelar y volver al menú", callback_data="cancelar_menu")]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        f"¿Cuántas unidades deseas? (Máximo {MAX_CANTIDAD})",
        reply_markup=reply_markup
    )
    return QUANTITY


# ---------------------------------------------------------------------
async def cancelar_seleccion(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    user = context.user_data.get("user")
    productos = context.user_data.get("productos", [])

    if not productos:
        productos = requests.get(f"{API_URL}/api/productos/").json()[:10]
        context.user_data["productos"] = productos

    lista = "\n".join([
        f"{p['id']}. {p.get('name') or p.get('nombre')} - ${p.get('price') or p.get('precio')}"
        for p in productos
    ])

    await query.message.reply_text(
        f"🛍 No hay problema {user['first_name'] if user else ''}, elige otro producto:\n\n{lista}\n\n👉 Escribe el número del producto que deseas."
    )
    return PRODUCT


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

    qr_data = f"Transferencia a {TITULAR} ({BANCO}) - Total: ${total:.2f}"
    qr_img = qrcode.make(qr_data)
    qr_path = f"pago_{user['id']}.png"
    qr_img.save(qr_path)

    with open(qr_path, "rb") as qr_file:
        keyboard = [[InlineKeyboardButton("✅ Continuar", callback_data="continuar_pago")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_photo(
            photo=qr_file,
            caption=(f"💳 Método de pago: Transferencia Bancaria\n\nBanco: {BANCO}\nTitular: {TITULAR}\n\n"
                     f"Total a pagar: ${total:.2f}\n\nEscanea este código QR para realizar tu pago 👇"),
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

    pedido = {
        "user_id": user["id"],
        "address_id": 1,
        "status_id": 4,
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

    pdf_output = generar_factura_pdf(user, producto, cantidad, total)
    factura_file = InputFile(pdf_output, filename="factura_kahua.pdf")

    await query.message.reply_document(
        document=factura_file,
        caption="🧾 Aquí tienes tu factura electrónica.\n¡Gracias por tu compra en KAHUA! 🥭"
    )

    keyboard = [
        [InlineKeyboardButton("🛍 Iniciar nueva compra", callback_data="nueva_compra")],
        [InlineKeyboardButton("🚪 Salir", callback_data="salir")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await query.message.reply_text(
        "¿Deseas realizar otra compra o salir del chat?",
        reply_markup=reply_markup
    )

    return PAYMENT


# ---------------------------------------------------------------------
async def nueva_compra(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    user = context.user_data["user"]

    await query.message.reply_text(
        f"🛍 ¡Perfecto {user['first_name']}! Vamos a iniciar una nueva compra 🥭"
    )

    productos = requests.get(f"{API_URL}/api/productos/").json()[:10]
    context.user_data["productos"] = productos

    lista = "\n".join([
        f"{p['id']}. {p.get('name') or p.get('nombre')} - ${p.get('price') or p.get('precio')}"
        for p in productos
    ])

    await query.message.reply_text(f"{lista}\n\n👉 Escribe el número del producto que deseas.")
    return PRODUCT


async def salir(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    await query.message.reply_text("👋 ¡Gracias por comprar con KAHUA! Esperamos verte pronto 🥭")
    return ConversationHandler.END


# ---------------------------------------------------------------------
def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            PRODUCT: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_product)],
            QUANTITY: [
                MessageHandler(filters.TEXT & ~filters.COMMAND, get_quantity),
                CallbackQueryHandler(cancelar_seleccion, pattern="cancelar_menu")
            ],
            PAYMENT: [
                CallbackQueryHandler(continuar_pago, pattern="continuar_pago"),
                CallbackQueryHandler(nueva_compra, pattern="nueva_compra"),
                CallbackQueryHandler(salir, pattern="salir")
            ],
        },
        fallbacks=[CommandHandler("cancel", salir)],
    )

    app.add_handler(conv_handler)
    print("🤖 Bot de KAHUA corriendo y listo para recibir pedidos...")
    app.run_polling()


if __name__ == "__main__":
    main()
