// invoice.js — all invoice logic lives here (external file = no HTML parser issues)

var STANDALONE_CSS =
  ":root{--text:#1f2430;--muted:#6b7280;--primary:#2563eb;--border:#e5e7eb;--accent:#16a34a}" +
  "*{box-sizing:border-box}" +
  "body{font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f7f7fb;color:var(--text);margin:0;padding:20px}" +
  ".container{max-width:750px;margin:0 auto}" +
  ".invoice-box{background:#fff;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.08);padding:32px}" +
  ".invoice-header{display:flex;justify-content:space-between;border-bottom:2px solid var(--border);padding-bottom:16px;margin-bottom:20px}" +
  ".invoice-header h1{margin:0;font-size:1.4rem}" +
  ".invoice-meta{text-align:right;font-size:.9rem;color:var(--muted)}" +
  ".invoice-parties{display:flex;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px}" +
  ".invoice-parties h3{font-size:.8rem;text-transform:uppercase;color:var(--muted);margin-bottom:6px}" +
  ".invoice-table{width:100%;border-collapse:collapse;margin-bottom:20px}" +
  ".invoice-table th,.invoice-table td{padding:10px;border-bottom:1px solid var(--border);text-align:left;font-size:.9rem}" +
  ".invoice-total-row{font-weight:700;font-size:1.1rem}" +
  ".logo{font-weight:700;font-size:1.2rem}" +
  "@page{size:A4;margin:15mm}" +
  "@media print{body{background:#fff;padding:0}.invoice-box{box-shadow:none;border:none;border-radius:0;padding:0}}.invoice-table img{width:36px;height:36px;object-fit:cover;border-radius:6px;vertical-align:middle}";

function esc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildItemsRows(items) {
  var html = "";
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    html +=
      "<tr>" +
      '<td style="display:flex;align-items:center;gap:8px;"><img src="' + esc(item.image) + '" alt="" style="width:36px;height:36px;object-fit:cover;border-radius:6px;" /> ' + esc(item.name) + "</td>" +
      "<td>$" + Number(item.price).toFixed(2) + "</td>" +
      "<td>" + item.qty + "</td>" +
      "<td>$" + Number(item.subtotal).toFixed(2) + "</td>" +
      "</tr>";
  }
  return html;
}

function renderInvoice(ord, standalone) {
  var itemsRows = buildItemsRows(ord.items);
  var phoneLine = ord.customer.phone
    ? "<div>" + esc(ord.customer.phone) + "</div>"
    : "";

  var banner = "";
  if (!standalone) {
    banner =
      '<div class="success-banner">Order placed successfully! Thank you for your purchase, ' +
      esc(ord.customer.name) +
      ".</div>";
  }

  var actions = "";
  if (!standalone) {
    actions =
      '<div class="invoice-actions">' +
      '<button type="button" class="btn btn-primary" id="btnDownload">Download Invoice (.html)</button> ' +
      '<button type="button" class="btn btn-outline" id="btnPrint">Print Invoice (A4)</button> ' +
      '<a href="../index.html" class="btn btn-outline">Back to Shop</a>' +
      "</div>";
  }

  var inner =
    banner +
    '<div class="invoice-box">' +
    '<div class="invoice-header">' +
    "<div>" +
    '<div class="logo" style="color:#2563eb">ShopEase</div>' +
    "<h1>INVOICE</h1>" +
    "</div>" +
    '<div class="invoice-meta">' +
    "<div><strong>Order #:</strong> " + esc(ord.orderId) + "</div>" +
    "<div><strong>Date:</strong> " + esc(ord.date) + "</div>" +
    "<div><strong>Payment:</strong> " + esc(ord.payment) + "</div>" +
    "</div>" +
    "</div>" +
    '<div class="invoice-parties">' +
    "<div>" +
    "<h3>Billed To</h3>" +
    "<div>" + esc(ord.customer.name) + "</div>" +
    "<div>" + esc(ord.customer.email) + "</div>" +
    phoneLine +
    "<div>" + esc(ord.customer.address) + "</div>" +
    "</div>" +
    "<div>" +
    "<h3>Sold By</h3>" +
    "<div>ShopEase Demo Store</div>" +
    "<div>123 Market Street</div>" +
    "<div>support@shopease.example</div>" +
    "</div>" +
    "</div>" +
    '<table class="invoice-table">' +
    "<thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr></thead>" +
    "<tbody>" +
    itemsRows +
    '<tr class="invoice-total-row">' +
    '<td colspan="3">Total</td>' +
    "<td>$" + Number(ord.total).toFixed(2) + "</td>" +
    "</tr>" +
    "</tbody>" +
    "</table>" +
    '<p style="color:#6b7280;font-size:0.85rem">' +
    "This is a computer-generated invoice for a school demo project. No real payment was processed." +
    "</p>" +
    actions +
    "</div>";

  if (!standalone) {
    return inner;
  }

  return (
    "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\" />" +
    "<title>Invoice " + esc(ord.orderId) + " - ShopEase</title>" +
    "<style>" + STANDALONE_CSS + "</style></head><body>" +
    '<div class="container">' + inner + "</div>" +
    "</body></html>"
  );
}

function downloadInvoice(order) {
  if (!order) return;
  var html = renderInvoice(order, true);
  var blob = new Blob([html], { type: "text/html;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "invoice-" + order.orderId + ".html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function printInvoice() {
  window.print();
}

function initInvoicePage() {
  var order = null;
  try {
    order = JSON.parse(localStorage.getItem("shopease_last_order") || "null");
  } catch (e) {
    order = null;
  }

  var main = document.getElementById("mainContent");
  if (!main) return;

  if (!order) {
    main.innerHTML =
      '<div class="empty-state">' +
      "<h1>No invoice to show</h1>" +
      "<p>Place an order first to see an invoice here.</p>" +
      '<a href="../index.html">Back to shop</a>' +
      "</div>";
    return;
  }

  main.innerHTML = renderInvoice(order, false);

  var btnDl = document.getElementById("btnDownload");
  var btnPr = document.getElementById("btnPrint");
  if (btnDl) {
    btnDl.addEventListener("click", function () {
      downloadInvoice(order);
    });
  }
  if (btnPr) {
    btnPr.addEventListener("click", printInvoice);
  }
}

document.addEventListener("DOMContentLoaded", initInvoicePage);
