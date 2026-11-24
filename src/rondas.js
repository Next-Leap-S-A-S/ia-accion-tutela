const RONDAS=[
 {n:"Investigar", f:[
  {k:"rol",x:"Eres un abogado constitucionalista con 12 años de experiencia que prepara tutelas y ordena los hechos antes de argumentar."},
  {k:"rol",x:"Eres un investigador jurídico que diseña búsquedas en la relatoría de la Corte Constitucional y no responde de memoria."},
  {k:"ctx",x:"El paciente recibió la orden médica hace seis semanas y la EPS no ha autorizado el procedimiento."},
  {k:"ctx",x:"Ya tengo identificadas dos sentencias sobre el tema y necesito saber qué otras debo buscar."},
  {k:"ins",x:"Entrega una cronología en tres columnas: fecha, hecho y documento que lo respalda."},
  {k:"ins",x:"Formula el problema jurídico como una pregunta que el juez pueda responder."}]},
 {n:"Argumentar", f:[
  {k:"rol",x:"Eres un abogado que redacta tutelas en salud y distingue con precisión la procedencia del fondo del asunto."},
  {k:"rol",x:"Eres un abogado que escribe derechos de petición con peticiones numeradas y verificables."},
  {k:"ctx",x:"La entidad respondió de forma parcial y no resolvió las peticiones tercera y cuarta."},
  {k:"ctx",x:"La tutela se radicará dentro de los seis meses siguientes a la última negativa de la entidad."},
  {k:"ins",x:"Presenta un cuadro de procedencia: requisito, cómo se cumple con estos hechos y qué prueba lo acredita."},
  {k:"ins",x:"Redacta cada pretensión como una orden concreta, con plazo y responsable."}]},
 {n:"Decidir", f:[
  {k:"rol",x:"Eres un profesional de despacho judicial que organiza proyectos de fallo y deja la decisión a quien decide."},
  {k:"rol",x:"Eres un magistrado de segunda instancia que revisa fallos de tutela buscando su punto más débil."},
  {k:"ctx",x:"El término para decidir vence el viernes y hay un tercero que podría resultar afectado por la orden."},
  {k:"ctx",x:"El borrador cita siete sentencias y dos de ellas no las he podido encontrar en la relatoría."},
  {k:"ins",x:"Presenta dos alternativas de decisión y marca cada una con [DECISIÓN DEL JUEZ]."},
  {k:"ins",x:"No confirmes que una cita existe. Clasifica su riesgo e indica dónde comprobarla."}]},
 {n:"Las que engañan", f:[
  {k:"rol",x:"Actúa como el juez que va a leer mi tutela y señala lo que no le queda claro."},
  {k:"rol",x:"Eres prudente con la probabilidad de éxito y nunca la presentas como certeza."},
  {k:"ctx",x:"Toda la información que pego está anonimizada y los nombres fueron reemplazados por marcadores."},
  {k:"ctx",x:"El accionante ya presentó una tutela por los mismos hechos el año pasado y el fallo quedó en firme."},
  {k:"ins",x:"Separa lo que es un hecho probado de lo que es una inferencia."},
  {k:"ins",x:"Antes de entregar, verifica que cada pretensión tenga al menos una prueba que la soporte."}]}
];
