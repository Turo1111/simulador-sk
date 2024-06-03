import { useState, useEffect } from 'react';
import useNumeroPseudoAleatorio from './useNumeroPseudoAleatorio';

const usePoissonDistribution = (u) => {

    const getNextRandomNumber = useNumeroPseudoAleatorio();

    function generatePoisson(lambda) {
        let b = Math.exp(-lambda);
        let p = 1;
        let x = 0;
    
        while (p>b) {
          let u = getNextRandomNumber();
          p=p*u
          x=x+1
        }
        return x
    }

    return generatePoisson
}

export default usePoissonDistribution