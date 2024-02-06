import React from 'react'
import Navbar from '../components/Navbar'
import Afolabi from '../assets/Pic 026 - Afolabi Headshot.jpg'
import Damilare from '../assets/Pic 027 - Damilare Headshot.jpg'
import Chibuzor from '../assets/Pic 028 - Chibuzor Headshot.jpg'
import Emmanuel from '../assets/Pic 029 - Emmanuel Headshot.jpg'

const About = () => {
  return (
    <div>
        <Navbar/>
        <p className='text-green-800 text-4xl text-center mt-8'>About Recoa</p>
        <p className='text-green-800 text-4xl text-center mt-16'>Recoa FZE</p>
        <p className='text-center mt-8 px-16'>Recoa Stands for Real Estate company of Africa. We are institutional real estate developers exclusively focused on building a truly world-class portfolio of sustainabe rental apartment communities in the heart of urban African cities</p>
    
        <p className='text-green-800 text-4xl text-center mt-16'>Our Mission</p>
        <p className='text-center mt-8 px-16'>To us, an affordable home in the heart of urban cities is not a luxury, it is the price of admission for access to the best opportunities in the modern economy.</p>
        <p className='text-center mt-8 px-16'>Our mission on behalf of institutional investors, is simply to create developments that will give more people a chance to reach these opportunities.</p>
        <p className='text-center mt-8 px-16'>As we unveil our debut portfolio across Lagos, Nigeria's economic centers, we invite you to join our waitlist so you can secure your future address.</p>


        <p className='text-green-800 text-4xl text-center mt-16'>The Development Team</p>

 <div className='flex flex-col md:flex-row md:justify-center md:gap-x-[200px] mt-6'>
        <div className='flex flex-col md:flex-row md:gap-x-6' >
        <img src={Afolabi} alt='' className='w-[200px] h-[200px] object-cover'/>
        <div>
        <p>Afolabi Seriki</p>
        <p>CEO/Development Director</p>
        </div>
        </div>

      <div className='flex flex-col gap-y-9'>
{/* Damilare */}
        <div className='flex flex-col md:flex-row md:gap-x-6 '>
        <img src={Damilare} alt='' className='w-[200px] h-[200px] object-cover'/>
        <div>
        <p>Damilare Egunjobi</p>
        <p>Development Associate</p>
        </div>
        </div>


        {/* Chibuzor Festus */}
        <div className='flex flex-col md:flex-row md:gap-x-6'>
        <img src={Chibuzor} alt='' className='w-[200px] h-[200px] object-cover'/>
        <div>
        <p>Chibuzor Festus Onujiogu</p>
        <p>Development Operations</p>
        </div>
        </div>


        {/* Emmanuel Kilani */}
        <div className='flex flex-col md:flex-row md:gap-x-6'>
        <img src={Emmanuel} alt='' className='w-[200px] h-[200px] object-cover'/>
        <div>
        <p>Emmanuel Kilani</p>
        <p>Development Analyst</p>
        </div>
        </div>

        </div>

        </div>
        <div className='mb-16'></div>
    </div>
  )
}

export default About