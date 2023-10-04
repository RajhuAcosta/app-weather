import { useEffect, useState } from 'react';
const Loader = () => {
    const [renderizado, setRenderizado] = useState(false);
    useEffect(() => {
          // Simulamos una pequeña demora para que puedas ver la transición
        setTimeout(() => {
            setRenderizado(true);
        }, 1000); // Espera 1 segundo antes de aplicar la clase
    }, []);
  return (
    <main className="min-h-screen font-[Lato] bg-[#373839] overflow-x-hidden w-full">
        <div className="grid gap-[1vh]">
            <div className="m-auto mt-[26vh] flex justify-center">
                <img className="w-[24vh]" src="/icon-loaders/cloud_loader.png" alt="" />
            </div>
            <h2 className="text-center mt-[2vh] md:mt-[4vh] font-semibold text-xl text-white md:text-[5vh]">Weather app</h2>
            <i className="flex justify-evenly items-center w-[90vw] h-[6vh] m-auto mt-[2vh] md:mt-[4vh] bg-white rounded-3xl md:max-w-[800px]">
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_1.png" alt="" />
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_2.png" alt="" /> 
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_3.png" alt="" /> 
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_4.png" alt="" /> 
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_5.png" alt="" /> 
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_6.png" alt="" /> 
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_7.png" alt="" /> 
                    <img className='w-[5vh]' src="/icon-loaders/icon_loader_8.png" alt="" />
            </i>
            <i id="i" className={`w-[93.6vw] m-auto flex h-[6.5vh] ml-3 bg-[#373839] -translate-y-[7.1vh] transition duration-5000 ease-linear ${renderizado ? 'translate-x-full' : ''} md:-translate-y-[7.1vh] md:ml-6.9`}></i>
            <p className='text-white/70 text-center'>Aceptar ubicación : </p>
            <p className='text-white/70 text-center'>Muestra clima actual </p>
        </div>
    </main>
  )
}
export default Loader