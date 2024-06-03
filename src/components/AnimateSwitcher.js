import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const ComponentSwitcher = ({handleChange}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>{
          if ((prevIndex+1) === 3) {
            handleChange()
          }
          return  (prevIndex + 1) % 3
        });
        setProgress(0); // Reinicia la barra de progreso con cada cambio de paso
        
      }, 10000);
  
      return () => {
        clearInterval(interval)
      };
    }, []);

    useEffect(() => {
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => Math.min(prevProgress + (100 / 10), 100));
      }, 1000);

      return () => clearInterval(progressInterval);
    }, [activeIndex]);
  
    useEffect(() => {
      console.log(activeIndex);
    }, [activeIndex]);
  
    return (
      <Container>
        {activeIndex === 0 && <ContStep1><Truck1/></ContStep1>}
        {activeIndex === 1 && <ContStep2><Truck2/></ContStep2>}
        {activeIndex === 2 && <ContStep3><Box/></ContStep3>}
        <ProgressBarContainer>
          <ProgressBar progress={progress}>
            <SimulandoText>Simulando<span>...</span></SimulandoText>
          </ProgressBar>
        </ProgressBarContainer>
      </Container>
    );
  };
  
  export default ComponentSwitcher;

const moveTruck = keyframes`
  0% {
    left: -100px;
  }
  45% {
    left: 45%; /* Punto donde el camión se detiene */
  }
  55% {
    left: 45%; /* Mantén el camión en el mismo lugar durante la pausa */
  }
  100% {
    left: 100%;
  }
`;

const moveBox = keyframes`
  0% {
    left: -100px;
  }
  100% {
    left: 100%;
  }
`;

const dotFlashing = keyframes`
  0% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
`;

const Container = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContStep1 = styled.div`
  background-image: url('/step1.png');
  width: 100%;
  display: flex;
  flex: 1;
  background-size: inherit;
  background-position: bottom;
`;

const ContStep2 = styled.div`
  background-image: url('/step2.png');
  width: 100%;
  display: flex;
  flex: 1;
  background-size: inherit;
  background-position: bottom;
`;

const ContStep3 = styled.div`
  background-image: url('/step3.png');
  width: 100%;
  display: flex;
  flex: 1;
  background-size: contain;
  background-position: bottom;
`;

const Truck1 = styled.div`
  background-image: url('/Camion.gif');
  background-size: contain;
  background-repeat: no-repeat;
  width: 700px; // Ajusta el tamaño del camión según necesites
  height: 300px; // Ajusta el tamaño del camión según necesites
  position: absolute;
  bottom: 0;
  animation: ${moveTruck} 12s linear infinite; // Ajusta la duración de la animación según necesites
`;

const Truck2 = styled.div`
  background-image: url('/Camion.gif');
  background-size: contain;
  background-repeat: no-repeat;
  width: 700px; // Ajusta el tamaño del camión según necesites
  height: 300px; // Ajusta el tamaño del camión según necesites
  position: absolute;
  bottom: 0;
  animation: ${moveTruck} 12s linear infinite; // Ajusta la duración de la animación según necesites
`;

const Box = styled.div`
  background-image: url('/caja.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 100px; // Ajusta el tamaño del camión según necesites
  height: 100px; // Ajusta el tamaño del camión según necesites
  position: absolute;
  bottom: 50px;
  animation: ${moveBox} 12s linear infinite; // Ajusta la duración de la animación según necesites
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
  position: absolute;
  bottom: 15px;
`;

const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #76c7c0;
  transition: width 1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const SimulandoText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: white;
  position: absolute;
  span {
    animation: ${dotFlashing} 1s infinite steps(1, end) 0s, ${dotFlashing} 1s infinite steps(1, end) 0.5s;
  }
`;