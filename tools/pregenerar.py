#!/usr/bin/env python3
"""Pregenera la biblioteca de prompts extensos del generador estatico.

Uso:  ANTHROPIC_API_KEY=... python3 tools/pregenerar.py
Escribe generador/js/generados.js. La clave solo se lee del entorno.
"""
import json, os, pathlib, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOM = json.loads((ROOT / "tools" / "dominio.json").read_text(encoding="utf-8"))
MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-5-5")
KEY = os.environ.get("ANTHROPIC_API_KEY")
if not KEY: sys.exit("falta ANTHROPIC_API_KEY")

ROLES = ["Abogado litigante o de víctimas y accionantes", "Abogado de entidad pública o EPS (accionada)",
         "Juez o servidor de despacho judicial", "Defensor del pueblo, personero o consultorio jurídico"]
AREAS = {
 "tutela": ("Acción de tutela", ["Salud y seguridad social en salud", "Mínimo vital, pensiones y prestaciones", "Debido proceso administrativo y disciplinario", "Educación", "Tutela contra providencias judiciales", "Medidas provisionales y urgencia", "Impugnación, cumplimiento y desacato"],
           ["analizar","investigar","redactar","responder","decidir","revisar","estrategia","comunicar","seguimiento"], 2),
 "peticion": ("Derecho de petición y habeas data", ["Derecho de petición", "Habeas data y centrales de riesgo", "Acceso a la información pública"],
           ["analizar","investigar","redactar","responder","revisar","comunicar","seguimiento"], 1),
 "despacho": ("Decisión en el despacho judicial", ["Estructura del fallo de tutela", "Valoración de pruebas y pruebas de oficio", "Órdenes y cumplimiento", "Uso responsable de IA en el despacho"],
           ["analizar","investigar","decidir","revisar","seguimiento"], 1),
 "otras": ("Otras acciones constitucionales", ["Acción de cumplimiento", "Acciones populares y de grupo", "Habeas corpus"],
           ["analizar","investigar","redactar","estrategia","seguimiento"], 1),
}
CAMPOS = ["titulo","subarea","rol","contexto","instruccion","uso","error_comun","verificar"]
TOOL = {"name":"entregar_prompts","description":"Entrega los prompts RCI generados.",
 "input_schema":{"type":"object","properties":{"prompts":{"type":"array","items":{"type":"object",
   "properties":{k:{"type":"string"} for k in CAMPOS},"required":CAMPOS}}},"required":["prompts"]}}

def pedir(area, tarea, parte, rol):
    nombre, subs, _, _ = AREAS[area]
    usuario = (f"PERFIL DEL USUARIO\nÁrea: {nombre}\nSubáreas posibles: {'; '.join(subs)}\nRol profesional del usuario: {rol}\n"
               f"Tono de salida preferido: Formal de escrito judicial\n\nTAREA\nGenera 2 prompts distintos para: {DOM['tareas'][tarea]}.\n\n"
               f"VARIEDAD\nEste es el lote número {parte}. Cubre situaciones distintas a las más obvias. Cada prompt debe pertenecer a una subárea distinta y el campo 'subarea' debe ser EXACTAMENTE una de las subáreas posibles.\n\n"
               "Entrega el resultado llamando a la herramienta entregar_prompts. Cada prompt debe cumplir la extensión y las reglas del método.")
    body = {"model":MODEL,"max_tokens":9000,"system":DOM["metodo"],"tools":[TOOL],"thinking":{"type":"between_tools"},
            "messages":[{"role":"user","content":usuario}]}
    for intento in range(3):
        try:
            req = urllib.request.Request("https://api.anthropic.com/v1/messages", json.dumps(body).encode(),
                  {"content-type":"application/json","anthropic-version":"2023-06-01","x-api-key":KEY})
            r = json.load(urllib.request.urlopen(req, timeout=280))
            tu = [c for c in r["content"] if c["type"]=="tool_use" and "prompts" in c["input"]]
            if not tu: raise ValueError("sin prompts")
            out = []
            for p in tu[0]["input"]["prompts"]:
                if not all(p.get(k) for k in CAMPOS): raise ValueError("campos vacíos")
                if p["subarea"] not in subs: p["subarea"] = subs[0]
                p.update({"area":area,"tarea":tarea,"rolPerfil":rol}); out.append(p)
            return out
        except Exception as e:
            print("reintento", area, tarea, parte, e, flush=True); time.sleep(3)
    return []

def main():
    trabajos = []
    for area,(nombre,subs,tareas,partes) in AREAS.items():
        for t in tareas:
            for parte in range(1, partes+1):
                trabajos.append((area,t,parte,ROLES[(len(trabajos)) % len(ROLES)]))
    print(len(trabajos), "llamadas", flush=True)
    res = []
    with ThreadPoolExecutor(6) as ex:
        fut = {ex.submit(pedir,*j): j for j in trabajos}
        for f in as_completed(fut):
            res += f.result(); print("listo", fut[f][:3], len(res), flush=True)
    out = ROOT / "generador" / "js" / "generados.js"
    out.write_text("/* Prompts extensos pregenerados con IA para el generador estatico (tools/pregenerar.py). */\nwindow.GENERADOS = " + json.dumps(res, ensure_ascii=False, indent=0) + ";\n", encoding="utf-8")
    print("escrito", out, len(res))

if __name__ == "__main__": main()
