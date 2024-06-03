import { useState } from 'react';
import useNumeroPseudoAleatorio from './useNumeroPseudoAleatorio';

const useNormalDistribution = () => {

  const getNextRandomNumber = useNumeroPseudoAleatorio();

  const generateNormal = (media, desvio) => {
    let sum = 0
    for (let i = 1; i < 12; i++) {
      let u = getNextRandomNumber();
      sum = sum + u
    }
    let x = desvio*(sum-6)+media
    return x
  }

  return generateNormal;
};

export default useNormalDistribution;