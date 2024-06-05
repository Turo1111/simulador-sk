import React from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import Image from 'next/image'

export default function ModalReporte({open, handleClose, salidas}) {
  return (
    <Modal open={open} eClose={handleClose} title={'Reporte de la Simulacion'} height='90%' >
        <div>
            <Lista>
                <ItemLista>
                    <Image
                      src={'/cartonUsado.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}> Fibra reciclada: </span> {salidas?.fibraReciclada} toneladas
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/cartonDesechado.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Carton desechado: </span> {salidas?.cartonDesechado} toneladas
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/calidad.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Calidad muy buena: </span> {salidas?.calidadMuyBuena} toneladas
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/calidad.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Calidad buena: </span> {salidas?.calidadBuena} toneladas
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/calidad.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Calidad media: </span> {salidas?.calidadMedia} toneladas
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/toneladaCarton.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Carton recolectado: </span> {salidas?.cantidadCartonRecolectado} toneladas
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/arbol.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Arboles salvados: </span> {parseFloat(salidas?.cantidadArbolesSalvados).toFixed(2)} toneladas
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/rollo-de-papel.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Rollo de papel: </span> {parseFloat(salidas?.cantidadRolloPapel).toFixed(2)} toneladas 
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/impureza.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Impureza: </span> {parseFloat(salidas?.cantidadImpureza).toFixed(2)} toneladas 
                </ItemLista>
                <ItemLista>
                    <Image
                      src={'/fibra.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Fibra virgen: </span> {parseFloat(salidas?.cantidadFibraVirgen).toFixed(2)} toneladas 
                </ItemLista>
                <ItemLista>
                 <Image
                      src={'/caja.png'}
                      width={50}
                      height={50}
                    />
                    <span style={{fontWeight: 'bold', margin: '10px 15px'}}>Cajas fabricadas: </span> {parseFloat(salidas?.cantidadCajas).toFixed(2)} cajas 
                </ItemLista>
            </Lista>
        </div>
    </Modal>
  )
}

const Lista = styled.ul `
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const ItemLista = styled.li`
    list-style: none;
    margin: 15px 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
`
