import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "../../../assets/styles/factura.css";
import logo from "../../../assets/images/categorias/Logo-blanc.png";


/*
  Nota: este componente intenta mapear distintos shapes de respuesta del backend.
  Si el endpoint devuelve otra estructura, el componente usa el mock de ejemplo.
*/

const FacturaCard = ({ orderId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/admin/orders/${orderId}`);
        const payload = res.data;
        // Normalizar distintos formatos
        let normalized = null;

        // Caso 1: backend devuelve estructura con order, items, user
      if (payload.order && payload.items) {
        normalized = {
          order: payload.order,
          items: payload.items,
          user: payload.user || payload.customer || {},
          address: payload.address || {}
        };
      }

      // Caso 2: backend plano 
      else if (payload.id && payload.items) {
        normalized = {
          order: {
            id: payload.id,
            created_at: payload.created_at,
            subtotal: payload.subtotal,
            tax: payload.tax,
            shipping_cost: payload.shipping_cost,
            total: payload.total,
            note: payload.note || "",
            status: payload.status,
            payment_method: payload.payment_method
          },
          user: {
            first_name: payload.customer_name?.split(" ")[0] || "",
            last_name: payload.customer_name?.split(" ").slice(1).join(" ") || "",
            email: payload.email,
            phone: payload.phone,
            identification_number: payload.document
          },
          address: {
            street: payload.address
          },
          items: payload.items
        };
      }

      // Fallback por si acaso
      else {
        normalized = payload;
      }

        setData(normalized || payload);
      } catch (err) {
        console.warn("No se pudo cargar desde backend, usando mock:", err);
        setData(examplePayload());
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const downloadPdf = async () => {
      try {
        const html2pdf = (await import("html2pdf.js")).default || (await import("html2pdf.js"));
        const element = cardRef.current;
        if (!element) return alert("No se encontró la factura en el DOM");

        //  Asegurar que el contenido esté completamente visible antes de exportar
        window.scrollTo(0, 0);
        element.style.maxWidth = "100%";
        element.style.background = "#fff";

        const opt = {
          margin: 0, // sin margen interno
          filename: `${data?.order?.serial || "factura"}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            scale: 2.5,           // alta calidad
            useCORS: true,
            scrollY: 0,           // evita cortes por scroll
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight, 
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
          pagebreak: {
            mode: ["avoid-all", "css", "legacy"],
            after: ".footer", // asegúrate de no cortar el pie
          },
        };

        const pdf = html2pdf()
          .set(opt)
          .from(element)
          .toPdf()
          .get("pdf")
          .then((pdfObj) => {
            const totalPages = pdfObj.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
              pdfObj.setPage(i);
              pdfObj.setFontSize(10);
              pdfObj.text(
                `Página ${i} de ${totalPages}`,
                pdfObj.internal.pageSize.getWidth() - 40,
                pdfObj.internal.pageSize.getHeight() - 10
              );
            }
          });

        html2pdf().set(opt).from(element).save();
      } catch (e) {
        console.error("html2pdf import error:", e);
        alert(
          "No se pudo generar PDF. Verifica que html2pdf.js esté instalado correctamente."
        );
      }
    };


  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Cargando factura...</p>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-danger py-5">Factura no encontrada.</div>;
  }

  // Datos seguros y cálculos
  const order = data.order || {};
  const items = data.items || [];
  const user = data.user || {};
  const address = data.address || {};
  const taxRate = Number(order.tax || order.tax_rate || 19);

  const subtotal = items.reduce((acc, it) => acc + ((it.qty || it.quantity || it.qty === 0) ? (Number(it.qty || it.quantity) * Number(it.unit_price || it.price || it.unit_price || it.price || 0)) : (Number(it.quantity||0)*Number(it.unit_price||0))), 0);
  const discounts = items.reduce((acc, it) => acc + (Number(it.discount || 0)), 0);
  const taxBase = subtotal - discounts;
  const iva = Math.round(taxBase * (taxRate/100));
  const shipping = Number(order.shipping || order.shipping_cost || order.shipping || 0);
  const grandTotal = Number(order.total || (taxBase + iva + shipping) || 0);

  const formatCOP = (n) => {
    const v = Math.round(Number(n) || 0);
    return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(v);
  };

  return (
    <div className="wrap" ref={cardRef}>
                 

      <div className="card invoice-card" id="invoiceCard">
        {order.status?.toLowerCase() === "cancelado" && (
          <div className="sello-cancelada">CANCELADA</div>
        )}

        <div className="header">
          <div className="brand">
            <img id="logo" src={logo} alt="logo" />
            <div>
              <h2 id="companyName">{data.company?.name || " S.A.S"}</h2>
              <div className="small" id="companyInfo">{data.company?.address || "Cra. 123 · Quibdó"} · NIT: {data.company?.nit || "900000000-0"}</div>
            </div>
          </div>
          <div className="head-right">
            <div className="title">FACTURA ELECTRÓNICA</div>
            <div className="meta">No. <strong id="invoiceNo">{order.serial || `KAH-${order.id}`}</strong><br/>
              <span id="invoiceDate">{order.created_at ? new Date(order.created_at).toLocaleString() : ""}</span>
            </div>
          </div>
        </div>

        <div className="body">
          <div className="left-col">
            <div className="section client">
              <h4>Datos del cliente</h4>
              <div className="client-block">
                <div className="tag" id="clientTag">CLIENTE</div>
                <div style={{flex:1}}>
                  <div className="company-data">
                    <div><strong id="clientName">{(user.first_name||user.name||"") + (user.last_name?(" "+user.last_name):"")}</strong></div>
                    <div className="muted" id="clientId">{user.identification_number ? ("ID: "+user.identification_number) : (user.document ? ("ID: "+user.document) : "")}</div>
                    <div className="muted" id="clientAddress">{address.street ? `${address.street}${address.complement?(", "+address.complement):""}` : ""}</div>
                    <div className="muted" id="clientContact">{(user.email? user.email + ' · ':'') + (user.phone||'')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h4>Items</h4>
              <table className="items" id="itemsTable" aria-describedby="items">
                <thead>
                  <tr>
                    <th style={{width:"48%"}}>Producto</th>
                    <th style={{width:"10%"}}>Cant.</th>
                    <th style={{width:"16%"}}>Precio</th>
                    <th style={{width:"12%"}}>Desc.</th>
                    <th style={{width:"14%"}} className="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => {
                    const name = it.product_name || it.name || it.product || "Producto";
                    const qty = Number(it.qty ?? it.quantity ?? 1);
                    const unit = Number(it.unit_price ?? it.price ?? 0);
                    const discount = Number(it.discount ?? 0);
                    const lineSub = qty * unit - discount;
                    return (
                      <tr key={idx}>
                        <td><strong>{name}</strong><div className="muted" style={{fontSize:12}}>{it.sku ? `SKU: ${it.sku}` : ""} {it.notes ? ` - ${it.notes}` : ""}</div></td>
                        <td>{qty}</td>
                        <td>{formatCOP(unit)}</td>
                        <td>{formatCOP(discount)}</td>
                        <td className="text-right">{formatCOP(lineSub)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="section">
              <h4>Observaciones</h4>
              <div className="muted" id="invoiceNotes">{order.note || "Sin observaciones"}</div>
            </div>
          </div>

          <aside>
            <div className="summary">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div className="small">Método de pago</div>
                  <div id="paymentMethod" style={{fontWeight:700}}>{order.payment_method || order.payment || "Pago contra entrega"}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="small">Estado</div>
                  <div id="statusBadge" className="status">{order.status || order.state || ""}</div>
                </div>
              </div>

              <div style={{height:8}}></div>

              <div className="line"><div className="small">Subtotal</div><div id="subtotal">{formatCOP(subtotal)}</div></div>
              <div className="line"><div className="small">Descuentos</div><div id="discounts">{formatCOP(discounts)}</div></div>
              <div className="line"><div className="small">Base gravable</div><div id="taxBase">{formatCOP(taxBase)}</div></div>
              <div className="line"><div className="small">IVA ({taxRate}%)</div><div id="iva">{formatCOP(iva)}</div></div>
              <div className="line"><div className="small">Envio</div><div id="shipping">{formatCOP(shipping)}</div></div>
              <div className="line total"><div>Total</div><div id="grandTotal">{formatCOP(grandTotal)}</div></div>

              <div style={{height:8}}></div>
              <div className="small">Información bancaria</div>
              <div className="muted" style={{marginTop:6}}>Banco · Cuenta: 123456789 · Titular: Dairon S.A.S</div>
            </div>
          </aside>
        </div>

        <div className="footer">
          <div className="signature">
            <div style={{fontWeight:700}}>Firma del cliente / Recibí conforme</div>
            <div style={{height:42}}></div>
            <div className="small">Nombre: <span id="sigName">{user.first_name || user.name || ""}</span></div>
            <div className="small">CC: <span id="sigId">{user.identification_number || user.document || ""}</span></div>
          </div>

          <div style={{flex:1,paddingLeft:18}}>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              {/* QR */}
              <div className="qr" id="qrcode">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=Factura-Kahua"
                  alt="QR decorativo"
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "10px",
                    filter: "grayscale(20%) brightness(95%) contrast(110%)",
                  }}
                />
              </div>
            </div>
            <div style={{textAlign:"right"}} className="small muted">Generado por Dairon · www.dairon.admin</div>
          </div>
        </div>

        <div className="toolbar">
          <button className="btn ghost" id="downloadJson" onClick={()=>{
            const blob = new Blob([JSON.stringify({order,items,user,address},null,2)],{type:'application/json'});
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
            a.download = `factura-${order.serial || order.id}.json`; a.click(); URL.revokeObjectURL(a.href);
          }}>Descargar JSON</button>

          <button className="btn ghost" id="btnEmail" onClick={()=>{
            alert("Implementa endpoint /admin/orders/:id/email-invoice en el backend para enviar por correo.");
          }}>Enviar por correo</button>

          <button className="btn primary" id="btnPdf" onClick={downloadPdf}>Descargar PDF</button>
          <button className="btn" id="btnPrint" style={{background:'#fff',border:'1px solid rgba(0,0,0,0.06)'}} onClick={()=>window.print()}>Imprimir</button>
        </div>
      </div>
    </div>
  );
};

const examplePayload = () => ({
  company: { name:'Kahua S.A.S', nit:'900000000-0', address:'Cra. Ejemplo 123, Quibdó', logo: '/Logo-blanc.png' },
  order: {
    id: 50123,
    serial: 'KAH-2025-00050123',
    created_at: '2025-09-01T14:22:00',
    shipping: 3000,
    tax: 19,
    note: 'Entregar antes de las 6pm - Dejar en portería si no hay quien reciba',
    payment_method: 'Tarjeta / PSE',
    status: 'ENTREGADO'
  },
  items:[
    { product_name:'Jugo Naranja 500ml', qty:2, unit_price:4500, discount:0, sku:'JN-500' },
    { product_name:'Smoothie Mango 350ml', qty:1, unit_price:5200, discount:200, sku:'SM-350' },
    { product_name:'Combo Energía (3x)', qty:1, unit_price:12000, discount:1200, sku:'CB-ENER' }
  ],
  user:{ id:12, first_name:'Juan', last_name:'Pérez', identification_number:'1098765432', email:'juanp@example.com', phone:'+57 300 1234567' },
  address:{ id:3, street:'Cll 10 # 5-20', complement:'Apto 201' }
});

export default FacturaCard;
