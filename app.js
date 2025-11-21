// INSERTA TU API KEY AQUÍ
const API_KEY = "c2093b14cbec7123f085c4b4";

// Elementos del DOM
const gtqInput = document.getElementById("gtq");
const usdInput = document.getElementById("usd");
const crcInput = document.getElementById("crc");
const statusText = document.getElementById("status");

let rates = null;

// Obtener tasas actualizadas
async function getRates() {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    const data = await res.json();

    if (data.result === "success") {
      rates = data.conversion_rates;
      statusText.textContent = "Tasas actualizadas ✔️";
      document.getElementById("rate-usd-gtq").textContent = `USD → GTQ: ${rates.GTQ}`;
      document.getElementById("rate-usd-crc").textContent = `USD → CRC: ${rates.CRC}`;

    } else {
      statusText.textContent = "Error al cargar tasas ❌";
    }
  } catch (error) {
    statusText.textContent = "No se pudo conectar al servidor ❌";
  }
}

// Funciones de conversión
function convertFromGTQ() {
  const gtq = parseFloat(gtqInput.value);
  if (!isNaN(gtq)) {
    usdInput.value = (gtq / rates.GTQ).toFixed(2);
    crcInput.value = (gtq / rates.GTQ * rates.CRC).toFixed(2);
  }
}

function convertFromUSD() {
  const usd = parseFloat(usdInput.value);
  if (!isNaN(usd)) {
    gtqInput.value = (usd * rates.GTQ).toFixed(2);
    crcInput.value = (usd * rates.CRC).toFixed(2);
  }
}

function convertFromCRC() {
  const crc = parseFloat(crcInput.value);
  if (!isNaN(crc)) {
    usdInput.value = (crc / rates.CRC).toFixed(2);
    gtqInput.value = (crc / rates.CRC * rates.GTQ).toFixed(2);
  }
}

// Detectar cambios en cada input
gtqInput.addEventListener("input", convertFromGTQ);
usdInput.addEventListener("input", convertFromUSD);
crcInput.addEventListener("input", convertFromCRC);

// Ejecutar
getRates();

document.getElementById("clearBtn").addEventListener("click", () => {
  gtqInput.value = "";
  usdInput.value = "";
  crcInput.value = "";

});

