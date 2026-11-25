/* Modo estatico: el generador entrega prompts pregenerados (js/generados.js) y no usa servidor.
   Para usar la API de Vercel en su lugar: MODO_ESTATICO = false y API_BASE = "https://<proyecto>.vercel.app". */
window.MODO_ESTATICO = true;
window.API_BASE = "";
/* Codigo de la clase. En modo estatico se comprueba en el navegador, asi que es una barrera de cortesia y no de seguridad. */
window.CLASE_CODIGOS = ["TUTELA2026"];
document.documentElement.classList.toggle("estatico", !!window.MODO_ESTATICO);
