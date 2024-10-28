// Base de datos expandida de enfermedades con síntomas y recomendaciones
const enfermedades = {
    "Gripe": {
        sintomas: ["fiebre", "tos", "dolor de garganta", "fatiga", "escalofríos", "dolor muscular"],
        consejo: "Descansa, hidrátate bien y consulta a un médico si los síntomas persisten."
    },
    "Alergia": {
        sintomas: ["estornudos", "picazón en los ojos", "secreción nasal", "tos"],
        consejo: "Evita los alérgenos conocidos y usa antihistamínicos si es necesario."
    },
    "COVID-19": {
        sintomas: ["fiebre", "tos", "dificultad para respirar", "fatiga", "pérdida del olfato", "pérdida del gusto"],
        consejo: "Aíslate, usa mascarilla y consulta a un médico de inmediato."
    },
    "Migraña": {
        sintomas: ["dolor de cabeza", "náuseas", "sensibilidad a la luz", "visión borrosa", "mareos"],
        consejo: "Descansa en un lugar oscuro y usa medicamentos recetados para migraña."
    },
    "Gastroenteritis": {
        sintomas: ["dolor abdominal", "diarrea", "vómitos", "fatiga", "fiebre"],
        consejo: "Mantente hidratado y evita alimentos sólidos hasta que los síntomas disminuyan."
    },
    "Sinusitis": {
        sintomas: ["dolor de cabeza", "tos", "fatiga", "secreción nasal", "dolor de garganta"],
        consejo: "Usa descongestionantes y consulta a un médico si los síntomas persisten."
    },
};

// Lista de palabras irrelevantes que eliminaremos del texto (stopwords)
const stopwords = ["me", "mucho", "muy", "tengo", "es", "la", "el", "los", "las", "una", "un", "de", "por", "y", "o"];

// Función para normalizar el texto: quitar stopwords y caracteres especiales
function normalizarTexto(texto) {
    return texto
        .toLowerCase()  // Convertimos a minúsculas
        .replace(/[^\w\s]/gi, '')  // Eliminamos caracteres especiales
        .split(' ')  // Convertimos el texto en un array de palabras
        .filter(palabra => !stopwords.includes(palabra))  // Eliminamos stopwords
        .join(' ');  // Unimos el texto limpio
}

function diagnosticar() {
    const inputTexto = document.getElementById("input-sintomas").value;
    const textoNormalizado = normalizarTexto(inputTexto);

    if (!textoNormalizado) {
        alert("Por favor ingresa una descripción de tus síntomas.");
        return;
    }

    // Descomposición en palabras clave detectadas
    const palabrasClave = textoNormalizado.split(' ');  // Convertimos el texto normalizado en un array de palabras

    let mejorCoincidencia = null;
    let maxSintomasComunes = 0;

    // Buscar la enfermedad con más coincidencias de palabras clave
    for (const enfermedad in enfermedades) {
        const sintomasEnfermedad = enfermedades[enfermedad].sintomas.map(s => s.toLowerCase());
        let sintomasComunes = 0;

        // Comparar palabras clave ingresadas con síntomas de la enfermedad
        palabrasClave.forEach(palabra => {
            sintomasEnfermedad.forEach(sintoma => {
                // Coincidencia exacta o parcial (palabra clave que se encuentra dentro de un síntoma)
                if (sintoma.includes(palabra)) {
                    sintomasComunes++;
                }
            });
        });

        // Encontramos la enfermedad con más coincidencias
        if (sintomasComunes > maxSintomasComunes) {
            maxSintomasComunes = sintomasComunes;
            mejorCoincidencia = enfermedad;
        }
    }

    const resultadoDiv = document.getElementById("resultado");

    if (mejorCoincidencia) {
        const consejo = enfermedades[mejorCoincidencia].consejo;
        resultadoDiv.innerHTML = `<p><strong>Posible enfermedad:</strong> ${mejorCoincidencia}</p><p><strong>Consejo:</strong> ${consejo}</p>`;
        resultadoDiv.style.display = "block";
    } else {
        resultadoDiv.innerHTML = "<p>No se pudo determinar una enfermedad basada en la descripción ingresada.</p>";
        resultadoDiv.style.display = "block";
    }
}
