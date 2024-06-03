import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos para el contenedor del slider y la etiqueta
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 1rem;
`;

const SliderContainer = styled.div`
  width: 100%;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  background: ${(props) => `linear-gradient(
    to right, 
    #00a9f4 ${((props.value - props.min) / (props.max - props.min)) * 100}%, 
    #d3d3d3 ${((props.value - props.min) / (props.max - props.min)) * 100}%
  )`};
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #00a9f4;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #00a9f4;
    cursor: pointer;
  }
`;

const SliderComponent = ({ label, initialValue, min, max, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    onChange(event.target.value);
    setValue(event.target.value)
  };

  return (
    <Container>
      <Label>{label}</Label>
      <SliderContainer>
        <Slider 
          type="range" 
          min={min}
          max={max} 
          value={value} 
          onChange={handleChange}
        />
      </SliderContainer>
    </Container>
  );
};

export default SliderComponent;