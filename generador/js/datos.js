/* Opciones del selector en cascada, para la acción de tutela. */
window.AREAS = [
  { id: "tutela", nombre: "Acción de tutela", sub: ["Salud y seguridad social en salud", "Mínimo vital, pensiones y prestaciones", "Debido proceso administrativo y disciplinario", "Educación", "Tutela contra providencias judiciales", "Medidas provisionales y urgencia", "Impugnación, cumplimiento y desacato"] },
  { id: "peticion", nombre: "Derecho de petición y habeas data", sub: ["Derecho de petición", "Habeas data y centrales de riesgo", "Acceso a la información pública"] },
  { id: "despacho", nombre: "Decisión en el despacho judicial", sub: ["Estructura del fallo de tutela", "Valoración de pruebas y pruebas de oficio", "Órdenes y cumplimiento", "Uso responsable de IA en el despacho"] },
  { id: "otras", nombre: "Otras acciones constitucionales", sub: ["Acción de cumplimiento", "Acciones populares y de grupo", "Habeas corpus"] },
];
window.ROLES = ["Abogado litigante o de víctimas y accionantes", "Abogado de entidad pública o EPS (accionada)", "Juez o servidor de despacho judicial", "Defensor del pueblo, personero o consultorio jurídico", "Docente o investigador", "Estudiante o abogado en formación"];
window.ENFOQUES = ["Redactar escritos y recursos", "Investigar jurisprudencia y normas", "Estrategia y teoría del caso", "Decidir y motivar", "Control de calidad y verificación", "Comunicación con el accionante o el cliente", "Seguimiento al cumplimiento", "Formación y docencia"];
window.JURISDICCIONES = ["Colombia", "Colombia y sistema interamericano"];
window.NIVELES = ["Primera vez con IA", "La uso a veces", "La uso a diario"];
window.TONOS = ["Formal de escrito judicial", "Técnico y sobrio", "Claro para el accionante", "Directo y breve"];
window.TAREAS = [
  { id: "analizar", nombre: "Analizar el caso y la procedencia", d: "Hechos, problema jurídico, subsidiariedad e inmediatez." },
  { id: "investigar", nombre: "Investigar y verificar fuentes", d: "Normas, líneas jurisprudenciales y control de la IA." },
  { id: "redactar", nombre: "Redactar escritos de tutela", d: "Tutela, petición, impugnación, medida provisional." },
  { id: "responder", nombre: "Responder como entidad accionada", d: "Informe al juez, hechos uno por uno, plan de remedio." },
  { id: "decidir", nombre: "Preparar y probar la decisión", d: "Esqueleto del fallo, órdenes y objeciones." },
  { id: "revisar", nombre: "Revisar y auditar borradores", d: "Citas, hechos sin soporte y riesgos." },
  { id: "estrategia", nombre: "Estrategia y contraargumentos", d: "Escenarios, precedentes y cómo distinguirlos." },
  { id: "comunicar", nombre: "Comunicar con el accionante", d: "Qué esperar, plazos y resultados sin promesas." },
  { id: "seguimiento", nombre: "Seguimiento, cumplimiento y desacato", d: "Tablero de órdenes, requerimientos y desacato." },
];
