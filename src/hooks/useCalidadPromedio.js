import React from 'react'

export default function useCalidadPromedio() {

    function calcularPromedioCalidad(calidadMedia, calidadBuena, calidadMuyBuena) {
        const totalItems = calidadMedia + calidadBuena + calidadMuyBuena;
      
        if (totalItems === 0) {
          return {
            promedio: 0,
            nivelCalidad: "No hay items"
          }; // Si no hay items, el promedio es 0.
        }
      
        const valorCalidadMedia = 1;
        const valorCalidadBuena = 2;
        const valorCalidadMuyBuena = 3;
      
        const sumaPonderada = (calidadMedia * valorCalidadMedia) +
                              (calidadBuena * valorCalidadBuena) +
                              (calidadMuyBuena * valorCalidadMuyBuena);
      
        const promedioCalidad = sumaPonderada / totalItems;
      
        // Redondear el promedio
        const promedioRedondeado = Math.round(promedioCalidad);
      
        // Determinar el nivel de calidad
        let nivelCalidad;
        switch (promedioRedondeado) {
          case 1:
            nivelCalidad = "Calidad Media";
            break;
          case 2:
            nivelCalidad = "Calidad Buena";
            break;
          case 3:
            nivelCalidad = "Calidad Muy Buena";
            break;
          default:
            nivelCalidad = "Desconocido"; // En caso de que algo salga mal
            break;
        }
      
          return nivelCalidad
      }

      return calcularPromedioCalidad
}
