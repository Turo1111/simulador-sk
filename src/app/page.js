'use client'
import ComponentSwitcher from "@/components/AnimateSwitcher";
import Button from "@/components/Button";
import ChecklistItem from "@/components/CheckListItem";
import ModalReporte from "@/components/ModalReporte";
import ResultadoSimulacion from "@/components/ResultadoSimulacion";
import SliderComponent from "@/components/SliderInput";
import useCalidadPromedio from "@/hooks/useCalidadPromedio";
import useNormalDistribution from "@/hooks/useNormalDistribution";
import useNumeroPseudoAleatorio from "@/hooks/useNumeroPseudoAleatorio";
import usePoissonDistribution from "@/hooks/usePoissonDistribution";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function Home() {

  const [dias, setDias] = useState(1)
  const [calidadPromedio, setCalidadPromedio] = useState(3)
  const [salidas, setSalidas] = useState(undefined)
  const [activeAnimate, setActiveAnimate] = useState(0)
  const [openReporte, setOpenReporte] = useState(false)

  const getNextRandomNumber = useNumeroPseudoAleatorio();
  const generateNormal = useNormalDistribution()
  const generatePoisson = usePoissonDistribution()

  const simularReciclado = useCallback(() => {
    setActiveAnimate(1)
    let u = getNextRandomNumber();
    let mes = 1
    let cartonUsado = 0 //carton que pasa la clasificacion
    let cartonDesechado = 0  // carton no usado
    let calidadMuyBuena = 0 //contador
    let calidadBuena = 0 //contador
    let calidadMedia = 0 //contador
    let toneladas = 0 // contador de toneladas final simuladas
    let cantidadArbolesSalvados = 0
    let cantidadRolloPapel = 0
    let cantidadImpureza = 0
    let cantidadFibraVirgen = 0
    let cantidadCajasFinal = 0
    let calidadMinima = 0
    let calidadMaxima = 25
    if (parseInt(calidadPromedio) === 2) {
      calidadMaxima = 12
    }
    if (parseInt(calidadPromedio) === 1) {
      calidadMaxima = 6
    }
    while (mes <= dias) {
      mes++;
      let cartonReciclado = generatePoisson(666);
      let c = 1;
      toneladas+=cartonReciclado
      while (c <= cartonReciclado) {
        u = getNextRandomNumber();
        if (u<=0.8) {
          cartonUsado++
          u = getNextRandomNumber();
          let cvr = calidadMinima+calidadMaxima*u
          if (cvr <= 6) {
            calidadMuyBuena++
          }
          if (cvr > 6 && cvr <= 12) {
            calidadBuena++
          }
          if (cvr > 12 && cvr <= 25) {
            calidadMedia++
          }
        }
        else{
          cartonDesechado++
        }
        c++;
      }
      let arbolesPorTonelada = generateNormal(18,1)
      let arbolesSalvados = arbolesPorTonelada*cartonReciclado //cantidad de arboles salvados en este mes simulado
      cantidadArbolesSalvados+=arbolesSalvados
      let toneladasRolloPapel = (cartonReciclado*1)/(1.078) //cantidad de tonelladas de rollo de papel en este mes
      cantidadRolloPapel+=toneladasRolloPapel
      let toneladasImpureza = (cartonReciclado*0.318)/(1.078) //cantidad impurezas en mes simulado
      cantidadImpureza+=toneladasImpureza
      let toneladasFibraVirgen = (toneladasRolloPapel*0.24)/1 //cantidad de fibra virgen en mes simulado
      cantidadFibraVirgen+=toneladasFibraVirgen
      let cajasPorTonelada = generateNormal(2500,+-100) 
      let cantidadCajas = (toneladasRolloPapel*cajasPorTonelada)/1 //cantidad de cajas en mes simulado
      cantidadCajasFinal+=cantidadCajas
    }
    setSalidas({
      cantidadArbolesSalvados: cantidadArbolesSalvados,
      cantidadCajasFinal: cantidadCajasFinal,
      cantidadRolloPapel: cantidadRolloPapel,
      calidadBuena: calidadBuena,
      calidadMuyBuena: calidadMuyBuena,
      calidadMedia: calidadMedia,
      cartonUsado :cartonUsado,
      cartonDesechado: cartonDesechado,
      toneladas: toneladas,
      cantidadImpureza: cantidadImpureza,
      cantidadFibraVirgen: cantidadFibraVirgen
    })
  }, [getNextRandomNumber, dias, calidadPromedio]);

  return (
    <Container>
      <div style={{padding: 15}} >
        <Image
          src={'/skg_logo.png'}
          width={300}
          height={80}
        />
      </div>
      <div style={{display: "flex"}} >
        <div style={{backgroundColor: '#fff', borderRadius: 15, margin: '15px', padding: '0 15px'}} >
          <h2 style={{textAlign: "center", margin: '15px 0', fontSize: 16}} >Entradas</h2>
          <div style={{display: "flex", alignItems: "center", minWidth: 250}}>
            <SliderComponent label={'Cantidad de dias'} initialValue={dias} min={1} max={365} onChange={(e)=>setDias(e)} />
            <label style={{padding: 5}} >{dias}</label>
          </div>
          <div style={{display: "flex", alignItems: "center", minWidth: 250}}>
            <SliderComponent label={'Calidad promedio'} initialValue={calidadPromedio} min={1} max={3} onChange={(e)=>setCalidadPromedio(e)} />
            <label style={{padding: 5}} >
              {calidadPromedio}
            </label>
          </div>
          <div style={{display: "flex", justifyContent: "space-around" }} >
            <label style={{padding: 2, fontSize: 12}} >1 : Muy buena </label>
            <label style={{padding: 2, fontSize: 12}} >2 : Buena </label>
            <label style={{padding: 2, fontSize: 12}} >3 : Media </label>
          </div>
        </div>
       {/*  */}
        <div style={{display: "flex", flex: 1, width: '100%', flexDirection: "column", justifyContent: "end"}} >
          <Button onClick={simularReciclado} text={'SIMULAR RECICLADO'}/>
        </div>
      </div>
      {
        activeAnimate === 0 &&
        <div style={{display: "flex", flexDirection: 'column', justifyContent: "space-around", width: '100%', flex: 1, backgroundColor: "white", alignItems: "center"}}>
          <h2>! Bienvenidos al Simulador ¡</h2>
          <Image
          src={'/reciclar-simbolo.png'}
          width={120}
          height={120}
        />
        </div>
      }
      {activeAnimate === 2 &&
      <ResultadoSimulacion salidas={salidas} handleModalReporte={()=>setOpenReporte(true)} />
      }
      { activeAnimate === 1 && <ComponentSwitcher handleChange={()=>setActiveAnimate(2)} /> }
      {
        openReporte && 
        <ModalReporte open={openReporte} handleClose={()=>{
          setActiveAnimate(0)
          setOpenReporte(false)
        }} salidas={salidas} />
      }
    </Container>
  );
}


const Container = styled.main `
  background-image: url('/fondo-parque.jpg');
  width: 100%;
  height:100vh;
  background-size: cover;
  background-position-y: 480px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
