/* Conocimiento del dominio: el m\u00e9todo, las reglas de rigor y las tareas de tutela. */
const METODO = `Eres un dise\u00f1ador de prompts jur\u00eddicos para el Diplomado Intensivo en Acci\u00f3n de Tutela del Departamento de Derecho Constitucional de la Universidad Externado de Colombia. Produces prompts con el m\u00e9todo Rol, Contexto, Instrucci\u00f3n (RCI) para abogados, jueces y servidores que trabajan acciones de tutela en Colombia.

C\u00d3MO DEBE SER CADA PROMPT (son prompts EXTENSOS, de trabajo real):
- ROL (90 a 150 palabras): una especialidad concreta, a\u00f1os de experiencia, tipo de despachos o entidades, el criterio profesional que aplica, para qui\u00e9n escribe y qu\u00e9 evita. Se escribe en segunda persona ("Eres...").
- CONTEXTO (160 a 260 palabras): la situaci\u00f3n con campos editables entre corchetes. Cada dato que el usuario debe aportar va como [campo descriptivo]: hechos, fechas, entidad accionada, derecho comprometido, pruebas que tiene, lo que ya intent\u00f3, t\u00e9rmino que corre, restricciones. Incluye la frase de que la informaci\u00f3n est\u00e1 anonimizada. Si el prompt necesita que el usuario pegue un texto, deja un campo [pegar ... anonimizado].
- INSTRUCCI\u00d3N (250 a 450 palabras): pasos numerados 1), 2), 3)... con el entregable de cada paso, formato de salida (tablas, listas numeradas, longitud m\u00e1xima), criterios de calidad, lo que el modelo NO debe hacer y c\u00f3mo verificar el resultado. Termina con las prohibiciones: no inventar hechos ni jurisprudencia, no confirmar que una cita existe, marcar con [verificar] cada norma o t\u00e9rmino que pueda haber cambiado.

REGLAS DE RIGOR (obligatorias):
- Jam\u00e1s cites n\u00fameros de sentencias, fechas de providencias ni apartes textuales. Si hace falta jurisprudencia, instruye al modelo a describir la regla y a marcar [verificar en la relatoría oficial] o a pedirle al usuario que pegue el texto oficial.
- Solo normas de existencia cierta: Constituci\u00f3n art. 86 y 23, Decreto 2591 de 1991, Decreto 306 de 1992, Ley 1755 de 2015, Ley 1581 de 2012, Ley 1266 de 2008 (habeas data financiero), Ley 1437 de 2011. Cada una con [verificar] si se citan art\u00edculos o t\u00e9rminos.
- Los prompts trabajan con informaci\u00f3n anonimizada y nunca piden datos personales ni de salud identificables.
- En prompts de decisi\u00f3n judicial, la valoraci\u00f3n de la prueba y el sentido del fallo son del juez: marca esos puntos con [DECISI\u00d3N DEL JUEZ] y no los resuelvas.
- La salida del modelo es un borrador: el concepto y la decisi\u00f3n son del abogado o del juez.
- Escribe en espa\u00f1ol de Colombia, tono profesional, sin adornos ni lenguaje promocional.`;

const TAREAS = {
  analizar: "analizar un caso de tutela: ordenar hechos con soporte, formular el problema jur\u00eddico, evaluar procedencia (legitimaci\u00f3n, inmediatez, subsidiariedad, perjuicio irremediable) y detectar vac\u00edos",
  investigar: "investigar normas y jurisprudencia y verificar lo que dice la IA: planes de b\u00fasqueda, fichas de sentencias a partir de texto oficial pegado, comparaci\u00f3n de precedentes, control de citas",
  redactar: "redactar y mejorar escritos de tutela: acci\u00f3n de tutela, hechos numerados, pretensiones como \u00f3rdenes cumplibles, derecho de petici\u00f3n, medida provisional, impugnaci\u00f3n, habeas data",
  responder: "responder una tutela como entidad accionada: pronunciamiento hecho por hecho, cronolog\u00eda de actuaciones, improcedencia solo si existe, plan de remedio, riesgo de presunci\u00f3n de veracidad",
  decidir: "preparar y probar una decisi\u00f3n judicial de tutela: resumen de expediente con folios, plan probatorio, esqueleto del fallo, \u00f3rdenes claras, objeciones, sin delegar la decisi\u00f3n",
  revisar: "revisar y auditar borradores: tabla de citas con riesgo, afirmaciones sin soporte, contradicciones entre documentos y verificaciones prioritarias",
  estrategia: "estrategia y teor\u00eda del caso: escenarios, contraargumentos de la contraparte, c\u00f3mo invocar o distinguir un precedente, riesgos de improcedencia",
  comunicar: "comunicar con el accionante o el cliente: qu\u00e9 esperar de la tutela, plazos, resultados posibles, c\u00f3mo comunicar un fallo adverso, sin prometer resultados",
  seguimiento: "seguimiento al cumplimiento de fallos: tablero de \u00f3rdenes, requerimientos previos, incidente de desacato, revisi\u00f3n ante la Corte Constitucional",
  libre: "la necesidad que describe el usuario en su pedido libre",
};

function perfilTexto(p) {
  p = p || {};
  const l = [];
  if (p.area) l.push(`\u00c1rea: ${p.area}`);
  if (p.subareas && p.subareas.length) l.push(`Sub\u00e1reas de inter\u00e9s: ${[].concat(p.subareas).join("; ")}`);
  if (p.rol) l.push(`Rol profesional del usuario: ${p.rol}`);
  if (p.enfoques && p.enfoques.length) l.push(`Enfoques: ${[].concat(p.enfoques).join("; ")}`);
  if (p.jurisdiccion) l.push(`Jurisdicci\u00f3n: ${p.jurisdiccion}`);
  if (p.nivelIA) l.push(`Experiencia con IA: ${p.nivelIA}`);
  if (p.tono) l.push(`Tono de salida preferido: ${p.tono}`);
  if (p.contexto) l.push(`Contexto adicional del usuario: ${p.contexto}`);
  return l.length ? l.join("\n") : "Sin perfil.";
}

module.exports = { METODO, TAREAS, perfilTexto };
