import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 5px 15px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  accent-color: #00a9f4;
`;

const Label = styled.label`
  font-size: 14px;
`;

const ChecklistItem = ({ label, initialValue, onChange }) => {
  const [checked, setChecked] = useState(initialValue);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onChange(!checked)
  };

  return (
    <Container>
      <Checkbox 
        type="checkbox" 
        checked={checked} 
        onChange={handleCheckboxChange} 
      />
      <Label>{label}</Label>
    </Container>
  );
};

export default ChecklistItem;