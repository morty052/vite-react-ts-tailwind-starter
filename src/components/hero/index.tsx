import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <div className=" flex  h-screen max-w-5xl px-2 pt-20  sm:container sm:mx-auto sm:h-auto sm:px-8 ">
      <div className=" flex flex-col  gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 space-y-2">
          <p className="text-5xl font-semibold text-light sm:text-6xl">Vite Bunny</p>
          <p className="text-2xl text-light sm:text-3xl">Get your bunny at your doorstep in one click</p>
        </div>

        <div className="">
          <img className="w-full rounded-xl" src="https://placehold.co/700x600" alt="" />
        </div>

        <div className=" flex w-full flex-col items-center gap-4 pt-10 sm:flex-row sm:items-start sm:pt-6">
          <Link className="w-full" to={'/bunnies'}>
            <Button size={'hero'}>{t('Browse')}</Button>
          </Link>
          <Button className="bg-fuchsia-500" size={'hero'}>
            {t('Sign Up')}
          </Button>
        </div>
      </div>
    </div>
  )
}
