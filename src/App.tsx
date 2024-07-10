import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X } from 'lucide-react';
import { useState } from 'react';

export function App() {
  const [isGuestsInputVisible, setIsGuestsInputVisible] = useState(false);
  const [isGuestsModalVisible, setIsGuestsModalVisible] = useState(false);

  const handleGuestsInput = () => setIsGuestsInputVisible(!isGuestsInputVisible);
  const handleGuestsModal = () => setIsGuestsModalVisible(!isGuestsModalVisible);

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 ">

            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputVisible} type="text" name="" id="" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <div className='flex items-center gap-2'>
              <Calendar className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputVisible} type="text" name="" id="" placeholder="Quando" className="bg-transparent text-lg placeholder-zinc-400 w-32 outline-none" />
            </div>

            <div className='w-px h-6 bg-zinc-800' />

            {
              isGuestsInputVisible ? (
                <button onClick={handleGuestsInput} className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
                  Alterar local/data
                  <Settings2 className='size-5' />
                </button>
              ) : (
                <button onClick={handleGuestsInput} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                  Continuar
                  <ArrowRight className='size-5' />
                </button>
              )
            }
          </div>

          {
            isGuestsInputVisible && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 ">

                <button type='button' onClick={handleGuestsModal} className='flex items-center gap-2 flex-1'>
                  <UserRoundPlus className='size-5 text-zinc-400' />
                  <span className='text-zinc-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
                </button>

                <div className='w-px h-6 bg-zinc-800' />

                <button onClick={handleGuestsInput} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                  Confirmar viagem
                  <ArrowRight className='size-5' />
                </button>
              </div>
            )
          }
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
      </div>

      {isGuestsModalVisible && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>

          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900'>

            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
              <button onClick={handleGuestsModal}>
                <X className='size-5 text-zinc-400' />
              </button>
            </div>
            <p>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            
          </div>

        </div>
      )}

    </div>
  )
}
