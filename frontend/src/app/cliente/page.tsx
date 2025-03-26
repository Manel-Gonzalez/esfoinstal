"use client";
import {useEffect, useState} from "react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

type Content = {title: string; history: string; team: string};
const ClienteHome = () => {
  const [language, setLanguage] = useState<string>("es");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Esto funcionará tanto en Vercel (producción) como en local si tienes proxy o variable de entorno
    console.log("primeruseEffect");

    fetch(`${API_BASE}/test`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    console.log("use", message);
  }, [setMessage]);

  const content: Record<string, Content> = {
    es: {
      title: "Bienvenido a Esfoinstal",
      history:
        "Somos una empresa con años de experiencia en instalaciones eléctricas y fontanería.",
      team: "Nuestro equipo está formado por profesionales altamente cualificados.",
    },
    en: {
      title: "Welcome to Esfoinstal",
      history:
        "We are a company with years of experience in electrical and plumbing installations.",
      team: "Our team consists of highly qualified professionals.",
    },
    ca: {
      title: "Benvingut a Esfoinstal",
      history:
        "Som una empresa amb anys d'experiència en instal·lacions elèctriques i fontaneria.",
      team: "El nostre equip està format per professionals altament qualificats.",
    },
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: "",
        }}
      >
        <button onClick={() => (window.location.href = "/cliente")}>
          Home
        </button>

        <div>
          <label htmlFor="trabajos">Trabajos:</label>
          <select id="trabajos">
            <option value="electricidad">Electricidad</option>
            <option value="tuberias">Tuberías</option>
            <option value="cocinas">Cocinas</option>
            <option value="aires">Aires Acondicionados</option>
          </select>
        </div>

        <button onClick={() => (window.location.href = "/cliente/contacto")}>
          Contacto
        </button>

        {/* Selector de idioma */}
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="es">🇪🇸 Español</option>
          <option value="en">🇬🇧 English</option>
          <option value="ca">🇨🇦 Català</option>
        </select>
      </nav>

      {/* Contenido principal */}
      <header style={{padding: "20px", textAlign: "center"}}>
        <h1>{content[language].title}</h1>
        <p>{content[language].history}</p>
        <p>{content[language].team}</p>

        <h1>Welcome to the Client Page</h1>
        <p>Backend message: {message || "Loading..."}</p>
      </header>
    </div>
  );
};

export default ClienteHome;
