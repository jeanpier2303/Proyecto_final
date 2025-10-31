from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    ApplicationBuilder, CommandHandler, MessageHandler, filters,
    ConversationHandler, ContextTypes
)
import requests
import json
import traceback
import os
from dotenv import load_dotenv

load_dotenv()  # Cargar variables del .env

# Estados de la conversación
PRODUCT, QUANTITY = range(2)

# URL del backend
API_URL = "http://127.0.0.1:8001"
BOT_TOKEN = "8458014740:AAFCypDYWN7_w4PC2rbrc6Vsga91RA7ODek"

# --- CONFIGURACIÓN ---
MAX_CANTIDAD = 10  # cantidad máxima por producto
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
PAGO_URL = f"{FRONTEND_URL}/pago"  # página de pago (maqueta)

# -------------------------------------------------------------

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    args = context.args  # Telegram envía el ID de usuario en /start

    if not args:
        keyboard = [[InlineKeyboardButton("🔐 Iniciar sesión", url=f"{FRONTEND_URL}/login")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(
            "⚠️ No se reconocen tus credenciales.\n\n"
            "Por favor inicia sesión desde tu cuenta para continuar con los pedidos 👇",
            reply_markup=reply_markup
        )
        return ConversationHandler.END

    user_id = args[0]
    print("🟢 /start recibido. user_id =", user_id)

    try:
        # --- Obtener usuario ---
        response = requests.get(f"{API_URL}/api/auth/usuarios/{user_id}", timeout=8)
        if response.status_code != 200:
            await update.message.reply_text("❌ Usuario no encontrado.")
            return ConversationHandler.END

        user = response.json()

        context.user_data["user"] = user

        full_name = f"{user.get('first_name', '')} {user.get('last_name', '')}".strip()
        await update.message.reply_text(f"👋 ¡Hola {full_name or 'Usuario'}! Bienvenido de nuevo a KAHUA 🥭")

        # --- Obtener productos ---
        productos_response = requests.get(f"{API_URL}/api/productos/", timeout=8)
        if productos_response.status_code != 200:
            await update.message.reply_text("⚠️ No pude obtener la lista de productos.")
            return ConversationHandler.END

        productos = productos_response.json() 
        productos = productos[:20]
        context.user_data["productos"] = productos

        # Mostrar lista
        lista = "\n".join([
            f"{p['id']}. {p.get('name') or p.get('nombre')} - ${p.get('price') or p.get('precio')}"
            for p in productos
        ])
        await update.message.reply_text(
            f"📋 Productos disponibles para entrega imediata:\n{lista}\n\n"
            "Por favor escribe el número del producto que deseas consumir hoy:"
        )
        return PRODUCT

    except Exception as e:
        traceback.print_exc()
        await update.message.reply_text(f"⚠️ Ocurrió un error: {e}")
        return ConversationHandler.END


#  Elección del producto
async def get_product(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        texto = update.message.text.strip()
        if not texto.isdigit():
            raise ValueError("entrada no numérica")

        producto_id = int(texto)
        productos = context.user_data.get("productos", [])
        producto = next((p for p in productos if int(p["id"]) == producto_id), None)

        if not producto:
            await update.message.reply_text(
                "⚠️ Opción no válida.\nPor favor elige un número de la lista mostrada."
            )
            # volver a mostrar opciones
            lista = "\n".join([
                f"{p['id']}. {p.get('name') or p.get('nombre')} - ${p.get('price') or p.get('precio')}"
                for p in productos
            ])
            await update.message.reply_text(f"📋 Productos disponibles:\n{lista}")
            return PRODUCT

        context.user_data["producto"] = producto
        await update.message.reply_text(
            f"Has elegido {producto.get('name') or producto.get('nombre')} 🍹.\n"
            f"¿Cuántas unidades deseas? (máximo {MAX_CANTIDAD})"
        )
        return QUANTITY

    except Exception:
        await update.message.reply_text("⚠️ Escribe un número válido del producto.")
        return PRODUCT


#  Cantidad del producto
async def get_quantity(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        texto = update.message.text.strip()
        if not texto.isdigit():
            raise ValueError("entrada no numérica")

        cantidad = int(texto)
        if cantidad <= 0 or cantidad > MAX_CANTIDAD:
            await update.message.reply_text(
                f" Cantidad no válida. Solo puedes pedir entre 1 y {MAX_CANTIDAD} unidades."
            )
            return QUANTITY

        producto = context.user_data["producto"]
        user = context.user_data["user"]

        price = producto.get('price') or producto.get('precio')
        total = float(price) * cantidad
        context.user_data["cantidad"] = cantidad
        context.user_data["total"] = total

        # --- Botón para ir a pagar ---
        keyboard = [[InlineKeyboardButton("💳 Ir a pagar", url=PAGO_URL)]]
        reply_markup = InlineKeyboardMarkup(keyboard)

        await update.message.reply_text(
            f"🧾 Total a pagar: ${total:.2f}\n\n"
            "Haz clic en el botón para continuar con el pago 👇",
            reply_markup=reply_markup
        )

        # Registrar pedido en backend
        pedido = {
            "user_id": user["id"],
            "producto_id": producto["id"],
            "cantidad": cantidad,
            "total": total,
        }
        r = requests.post(f"{API_URL}/pedidos", json=pedido, timeout=8)
        print("📥 Pedido registrado:", r.status_code, r.text)

        await update.message.reply_text(" Tu pedido ha sido registrado correctamente. ¡Gracias por tu compra!")
        return ConversationHandler.END

    except ValueError:
        await update.message.reply_text("Ingresa un número válido para la cantidad.")
        return QUANTITY
    except Exception as e:
        traceback.print_exc()
        await update.message.reply_text(f"⚠️ Error: {e}")
        return ConversationHandler.END


# -------------------------------------------------------------
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🚪 Sesión cancelada. Usa /start para comenzar de nuevo.")
    return ConversationHandler.END


# -------------------------------------------------------------
def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            PRODUCT: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_product)],
            QUANTITY: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_quantity)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    app.add_handler(conv_handler)
    print("🤖 Bot de K A H U A corriendo y listo para recibir usuarios...")
    app.run_polling()


if __name__ == "__main__":
    main()
