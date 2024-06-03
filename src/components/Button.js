import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export default function Button({text, onClick, width='auto', to, type=''}) {

  
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
      {
        to ?
        <Link href={to}>
          <Btn onClick={onClick} width={width} >
            {text}
          </Btn>
        </Link>
        :
        <Btn onClick={onClick} width={width} type={type} >
          {text}
        </Btn>
      }
    </div>
  )
}

const Btn = styled.button `
    border: 0;
    background-color: ${process.env.BLUE_COLOR};
    padding: 10px 25px;
    border-radius: 10px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    width: auto;
    margin: 10px 0;
    cursor: pointer;
    :hover{
        background-color: #637195;
    }
`
