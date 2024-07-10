// import React from 'react';
// import HomeBg1 from '../assets/HomeBg1.jpg';
// import laptop from '../assets/laptop.webp'
// import AMan from '../assets/AMan.png'
// import { TypeAnimation } from 'react-type-animation';
// import { FaLongArrowAltRight } from 'react-icons/fa'


// const Home = () => {
  
//   return (
//     <div className=
//     'w-full mx-auto relative mt-[16px] h-screen bg-gradient-to-r from-blue-300 via-blue-500 to-gray-300 bg-opacity-50 sm:max-h-full'>

//       <div className='w-11/12 mx-auto relative flex justify-center items-center gap-3 mt-14 lg:flex-nowrap'>

//       <div className="lg:w-1/2 mt-17">

//         {/* <img src={HomeBg1} alt='BgHomeImg' className='absolute lg:w-1/2 skew-x-6 bg-transparent bg-gray-300 scale-95 -translate-x-8 -translate-y-6 shadow-md shadow-gray-400' /> */}
        
//         <img src={AMan} alt='man with ani' className='lg:w-[550px] scale-75 translate-y-10' />
       
//         <img src={laptop} alt='lp' className='absolute right-10 skew-y-3 rotate-12 -translate-x-44 -translate-y-28' />
//       </div>
//       <div className='lg:w-1/2 mt-3'>
//       <TypeAnimation
//       startDelete={false}
//       preRenderFirstString={true}
//       className='transition-all duration-200'
//       style={{ fontSize:'2em',fontWeight:"bold", textShadow:'1px 1px',whiteSpace: 'pre-line', height: '195px', display: 'block' }}
//   sequence={[
//     500,
//     'Create Your Task,', // initially rendered starting point
//     1000,
//     `Create Your Todos\nLive UpToDate With Your Task\nGenerate Productivity With Us\n Make Life Easier With Us.`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
//     2000,
//     '',
//   ]}
//       wrapper="span"
//       speed={10}
//       // style={{ fontSize: '2em', display: 'block' }}
//       repeat={Infinity}
//     />
   
//       </div>
//       <button
//           className="bg-orange-400 flex gap-1 justify-center items-center text-black shadow-md text-3xl font-bold px-2 py-1 rounded-md hover:bg-orange-600 absolute bottom-1 right-96"
//         >
//           Let's Start
//           <FaLongArrowAltRight />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Home;







/// home Responsive 

import React from 'react';
import HomeBg1 from '../assets/HomeBg1.jpg';
import laptop from '../assets/laptop.webp';
import AMan from '../assets/AMan.png';
import { TypeAnimation } from 'react-type-animation';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center overflow-y-hidden
    bg-gradient-to-r from-blue-300 via-blue-500 to-gray-300 bg-opacity-50 pb-8">
      <div className='w-11/12 mx-auto mt-[22px]'>
        <div className='flex flex-row justify-center items-center pt-32 gap-4 sm:flex-col'>
        <div className='lg:w-1/2 md:w-[50%] md:fixed md:left-2 sm:w-[60] sm:mx-auto md:top-32'>
          <img src={AMan} alt='man with ani' className='' />
        </div>
        
        <div className='md:relative lg:w-1/2 flex flex-col flex-wrap justify-start gap-10 px-1 sm:w-full'>
          <div className='sm:h-[310px] md:w-[50%] h-[70%] md:fixed md:right-2 md:top-32'>
          <TypeAnimation
            startDelete={false}
            preRenderFirstString={true}
            className='transition-all duration-200 sm:text-xl'
            style={{ fontSize:'2em',fontWeight:"bold", textShadow:'1px 1px',whiteSpace: 'pre-line', height: '195px', display: 'block' }}
            sequence={[
              500,
              'Create Your Task,', // initially rendered starting point
              1000,
              `Create Your Todos,\nLive UpToDate With Your Task\nGenerate Productivity With Us\n Make Life Easier With Us.`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
              2000,
              '',
            ]}
            wrapper="span"
            speed={10}
            // style={{ fontSize: '2em', display: 'block' }}
            repeat={Infinity}
          />
          </div>
          <div className='md:flex md:justify-center md:items-center md:absolute md:bottom-2'>
          <div className='h-[30%] sm:absolute sm:-translate-y-20 md:fixed md:bottom-24'>
          <Link to='/signup'>
          <button
          className="bg-orange-400 flex gap-1 justify-center items-center text-black shadow-md text-3xl font-bold px-2 py-1 rounded-md hover:bg-orange-600"
        >
          Let's Start
          <FaLongArrowAltRight />
        </button>
          </Link>
          </div>
          </div>

        </div>
        </div>

      </div>

      {/* <div className='flex justify-center items-center mt-12'>
         <Link to='/signup'>
          <button
          className="bg-orange-400 flex gap-1 justify-center items-center text-black shadow-md text-3xl font-bold px-2 py-1 rounded-md hover:bg-orange-600"
        >
          Let's Start
          <FaLongArrowAltRight />
        </button>
          </Link>
         </div> */}
    </div>
  );
};

export default Home;



