import Image from 'next/image'
import React from 'react'
import Button from './Button'
import useCalidadPromedio from '@/hooks/useCalidadPromedio'

export default function ResultadoSimulacion({salidas, handleModalReporte}) {

    const calcularPromedioCalidad = useCalidadPromedio()

  return (
    <div style={{display: "flex", flexDirection: "column", width: '100%', flex: 1, backgroundColor: "white", justifyContent: "space-between"}}>
        <h2 style={{textAlign: "center"}} >Resultados de la simulacion</h2>
        <div style={{display: "flex", justifyContent: "space-around"}} >
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Image
              src={'/rollo-de-papel.png'}
              width={80}
              height={80}
            />
            <label style={{fontWeight: 500, margin: '15px 5px', fontSize: 18}}>{parseFloat(salidas?.cantidadRolloPapel).toFixed(2)} toneladas </label>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Image
              src={'/caja.png'}
              width={80}
              height={80}
            />
            <label style={{fontWeight: 500, margin: '15px 5px', fontSize: 18}}>{parseFloat(salidas?.cantidadCajas).toFixed(2)} cajas </label>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Image
              src={'/alta-calidad.png'}
              width={80}
              height={80}
            />
            <label style={{fontWeight: 500, margin: '15px 5px', fontSize: 18}}>{calcularPromedioCalidad(salidas?.calidadMedia, salidas?.calidadBuena, salidas?.calidadMuyBuena)} </label>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Image
              src={'/arbol.png'}
              width={80}
              height={80}
            />
            <label style={{fontWeight: 500, margin: '15px 5px', fontSize: 18}}>{parseFloat(salidas?.cantidadArbolesSalvados).toFixed(2)} salvados </label>
          </div>
        </div> 
        <Button text={'Generar Reporte'} onClick={handleModalReporte}/>
      </div>
  )
}
