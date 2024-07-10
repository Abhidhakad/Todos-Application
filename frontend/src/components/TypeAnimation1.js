import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypeAnimation1 = () => {
  return (
    <>

<TypeAnimation
      sequence={[
        'Hello jee Jai shree Ram /n Radhey Radhey /n '
      ]}
      wrapper="span"
      speed={50}
      style={{ lineBreak:"auto",
        fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
    
    
    </>
  )
}

export default TypeAnimation1