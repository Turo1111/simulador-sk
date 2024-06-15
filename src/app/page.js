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
import Head from "next/head";
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
    let dia = 1
    let cartonRecolectado = 0
    let cantidadCartonRecolectado = 0
    let cartonDesechado = 0
    let cvr = 0
    let calidadMuyBuena = 0
    let calidadBuena = 0
    let calidadMedia = 0
    let cantidadImpureza = 0
    let fibraReciclada = 0
    let arbolesPorTonelada = 0
    let cantidadArbolesSalvados = 0
    let cantidadRolloPapel = 0
    let cantidadFibraVirgen = 0
    let cantidadCajas = 0
    let calidadPromedio = 3
    let calidadMinima = 0
    let calidadMaxima = 25
    if (parseInt(calidadPromedio) === 2) {
      calidadMaxima = 12
    }
    if (parseInt(calidadPromedio) === 1) {
      calidadMaxima = 6
    }
    while (dia <= dias) {
      let c = 1;
      dia++;
      cartonRecolectado = generatePoisson(666);
      cantidadCartonRecolectado+=cartonRecolectado
      while (c <= cartonRecolectado) {
        u = getNextRandomNumber();
        if (u<=0.8) {
          u = getNextRandomNumber();
          cvr = calidadMinima+calidadMaxima*u
          if (cvr <= 6) {
            calidadMuyBuena++
          }
          if (cvr > 6 && cvr <= 12) {
            calidadBuena++
          }
          if (cvr > 12 && cvr <= 25) {
            calidadMedia++
          }
          u = getNextRandomNumber();
          if (u<=0.12) {
            cantidadImpureza++
          }else{
            fibraReciclada++
            arbolesPorTonelada = generateNormal(18,1)
            cantidadArbolesSalvados+=arbolesPorTonelada
          }
        }
        else{
          cartonDesechado++
        }
        c++;
      }
    }
    cantidadFibraVirgen=(fibraReciclada*0.24)/0.76
    cantidadRolloPapel=cantidadFibraVirgen+fibraReciclada
    let rp = 1
    while (rp<=cantidadRolloPapel) {
      let cajasPorTonelada = generateNormal(2500, 100)
      cantidadCajas+=cajasPorTonelada
      rp++
    }
    setSalidas({
      cantidadCartonRecolectado : cantidadCartonRecolectado,
      cartonDesechado : cartonDesechado,
      calidadMuyBuena : calidadMuyBuena,
      calidadBuena : calidadBuena,
      calidadMedia : calidadMedia,
      cantidadImpureza : cantidadImpureza,
      fibraReciclada : fibraReciclada,
      cantidadArbolesSalvados : cantidadArbolesSalvados,
      cantidadRolloPapel : cantidadRolloPapel,
      cantidadFibraVirgen : cantidadFibraVirgen,
      cantidadCajas: cantidadCajas
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
