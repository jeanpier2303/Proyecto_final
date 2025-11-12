import io, os, qrcode
from fpdf import FPDF
from datetime import datetime

# === Configuración general ===
COSTO_ENVIO = 4000
IVA_PORCENTAJE = 0.19
BANCO = "Davivienda"
TITULAR = "Dairon S.A.S"
LOGO_PATH = "app/bot/assets/logo_kahua.png"
EMPRESA = "KAHUA Natural Drinks S.A.S"
NIT = "900000000-0"
DIRECCION = "Cra. 123 - Quibdó"
EMAIL_EMPRESA = "kahua.naturaldrinks@gmail.com"

COLOR_PRIMARIO = (98, 0, 238)  # Morado principal
COLOR_FONDO_TABLA = (245, 245, 245)
COLOR_TEXTO = (50, 50, 50)


class FacturaPDF(FPDF):
    def header(self):
        """Encabezado con fondo morado y logo"""
        self.set_fill_color(*COLOR_PRIMARIO)
        self.rect(0, 0, 210, 35, "F")
        if os.path.exists(LOGO_PATH):
            self.image(LOGO_PATH, 12, 7, 25)
        self.set_text_color(255, 255, 255)
        self.set_font("Helvetica", "B", 14)
        self.cell(0, 10, EMPRESA, ln=True, align="R")
        self.set_font("Helvetica", "", 10)
        self.cell(0, 8, f"{DIRECCION}  •  NIT: {NIT}", ln=True, align="R")
        self.cell(0, 6, f"{EMAIL_EMPRESA}", ln=True, align="R")
        self.ln(10)

    def footer(self):
        """Pie de página"""
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(
            0,
            10,
            f"Generado automáticamente por KAHUA  •  {datetime.now().strftime('%d/%m/%Y %H:%M')}",
            align="C",
        )


def generar_factura_pdf(user, producto, cantidad, total):
    pdf = FacturaPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_text_color(*COLOR_TEXTO)

    # === Título principal ===
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(*COLOR_PRIMARIO)
    pdf.cell(0, 10, "FACTURA ELECTRÓNICA", align="L")
    pdf.set_text_color(*COLOR_TEXTO)
    pdf.ln(5)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 8, f"No. KAH-{user['id']}", align="L", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, f"Fecha de emisión: {datetime.now().strftime('%d/%m/%Y %I:%M %p')}", align="L")
    pdf.ln(10)

    # === Datos del cliente ===
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_fill_color(*COLOR_FONDO_TABLA)
    pdf.cell(0, 8, "Datos del Cliente", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)

    data_cliente = [
        ("Nombre:", f"{user['first_name']} {user['last_name']}"),
        ("Correo:", user["email"]),
    ]

    for label, value in data_cliente:
        pdf.cell(40, 8, label, border=1)
        pdf.cell(0, 8, value, border=1, new_x="LMARGIN", new_y="NEXT")

    pdf.ln(6)

    # === Tabla de productos ===
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_fill_color(*COLOR_PRIMARIO)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(80, 8, "Producto", border=1, fill=True)
    pdf.cell(30, 8, "Cantidad", border=1, fill=True, align="C")
    pdf.cell(40, 8, "Precio Unitario", border=1, fill=True, align="C")
    pdf.cell(40, 8, "Subtotal", border=1, fill=True, align="R")
    pdf.ln(8)

    pdf.set_text_color(*COLOR_TEXTO)
    pdf.set_font("Helvetica", "", 10)
    nombre = producto.get("name") or producto.get("nombre")
    precio_unitario = float(producto.get("price") or producto.get("precio"))
    subtotal = cantidad * precio_unitario

    pdf.cell(80, 8, nombre, border=1)
    pdf.cell(30, 8, str(cantidad), border=1, align="C")
    pdf.cell(40, 8, f"${precio_unitario:,.0f}", border=1, align="C")
    pdf.cell(40, 8, f"${subtotal:,.0f}", border=1, align="R")
    pdf.ln(10)

    # === Cálculo de totales ===
    iva = subtotal * IVA_PORCENTAJE
    total_final = subtotal + iva + COSTO_ENVIO

    totales = [
        ("Subtotal", subtotal),
        ("IVA (19%)", iva),
        ("Costo de envío", COSTO_ENVIO),
        ("TOTAL", total_final),
    ]

    for label, value in totales:
        pdf.set_font("Helvetica", "B" if label == "TOTAL" else "", 11)
        pdf.cell(150, 8, f"{label}:", align="R", border=1)
        pdf.cell(40, 8, f"${value:,.0f}", align="R", border=1, new_x="LMARGIN", new_y="NEXT")

    pdf.ln(10)

    # === Información Bancaria ===
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 8, "Información Bancaria", new_x="LMARGIN", new_y="NEXT", fill=False)
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 8, f"Banco: {BANCO}  •  Titular: {TITULAR}", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(8)

    # === Firma del cliente ===
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 8, "Firma del cliente / Recibí conforme", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 6, f"Nombre: {user['first_name']} {user['last_name']}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, f"Correo: {user['email']}", new_x="LMARGIN", new_y="NEXT")

    # === Código QR ===
    qr_data = f"Factura KAH-{user['id']} | Cliente: {user['first_name']} | Total: ${total_final:,.0f}"
    qr_img = qrcode.make(qr_data)
    qr_path = f"factura_qr_{user['id']}.png"
    qr_img.save(qr_path)
    pdf.image(qr_path, x=165, y=pdf.get_y() - 35, w=35)
    os.remove(qr_path)

    # === Salida del PDF ===
    pdf_output = io.BytesIO(pdf.output(dest="S"))
    return pdf_output
