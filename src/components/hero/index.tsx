import { useTranslation } from 'react-i18next'
import { OnboardingForm } from 'src/pages'
import bg from '../../assets/bg.jpg'

// const OnboardingForm = () => {
//   const [signingUp, setsigningUp] = useState(true)

//   const SignUp = () => {
//     return (
//       <div className="space-y-4 px-2  pb-8 pt-4 sm:pt-20">
//         <div className="mx-auto max-w-md space-y-6">
//           <div className="">
//             <span className=" text-light ">Log in </span>
//             <input
//               className="mt-2 w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
//               placeholder="Email"
//               type="text"
//               name=""
//               id=""
//             />
//           </div>
//           <div className="">
//             <input
//               className="w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
//               placeholder="Password"
//               type="text"
//               name=""
//               id=""
//             />
//             <div className="flex justify-between pt-2">
//               <p className="text-sm text-light">Forgot password?</p>
//               <a className="group flex cursor-pointer gap-x-1 text-sm text-light  hover:text-fuchsia-500">
//                 <p>Log in instead</p>
//                 <span className=" transition-all duration-200 ease-in group-hover:translate-x-1">&#8594;</span>
//               </a>
//             </div>
//           </div>
//           <Button className="bg-fuchsia-500" size={'hero'}>
//             Create Account
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   const SignIn = () => {
//     return (
//       <div className="space-y-4 px-2  pb-8 pt-4 sm:pt-20">
//         <div className="mx-auto max-w-md space-y-6">
//           <div className="">
//             <span className=" text-light ">Log in </span>
//             <input
//               className="mt-2 w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
//               placeholder="Email"
//               type="text"
//               name=""
//               id=""
//             />
//           </div>
//           <div className="">
//             <input
//               className="w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
//               placeholder="Password"
//               type="text"
//               name=""
//               id=""
//             />
//             <div className="flex justify-between pt-2">
//               <p className="text-sm text-light">Forgot password?</p>
//               <a
//                 onClick={() => setsigningUp(true)}
//                 className="group flex cursor-pointer gap-x-1 text-sm text-light  hover:text-fuchsia-500"
//               >
//                 <p>Sign up</p>
//                 <span className=" transition-all duration-200 ease-in group-hover:translate-x-1">&#8594;</span>
//               </a>
//             </div>
//           </div>
//           <Button className="bg-fuchsia-500" size={'hero'}>
//             Sign up
//           </Button>
//           <Button onClick={() => setsigningUp(true)} className="" size={'hero'}>
//             Create Account
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return <>{signingUp ? <SignUp /> : <SignIn />}</>
// }

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <div className="mx-auto w-full gap-y-4 sm:grid  sm:h-[calc(100vh-4rem)] sm:max-w-none sm:grid-cols-2 ">
      <div className="relative  sm:pt-20">
        <div
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
          }}
          className="absolute inset-0 -z-50 hidden  sm:block"
        ></div>
        <div className="z-50 mx-auto  px-2 pt-4 sm:px-4   sm:pt-0 md:max-w-sm">
          <p className="text-4xl font-semibold text-light sm:text-5xl sm:text-fuchsia-500">Vite Bunnies</p>
          <p className="text-lg font-medium text-light sm:text-fuchsia-500 md:text-2xl">
            Premium adult content how you need it when you need it
          </p>
        </div>
      </div>
      <OnboardingForm />
    </div>
  )
}
