import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs"
import { FaDollarSign, FaUserAlt } from "react-icons/fa"


const States = () => {
  return (
    <div className='mb-12 grid gap-y-10 gap-x-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 flex-grow'>
    {/* Sales Card */}
   <div className=" bg-bg-main">
   <div className='relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md '>
      <div
        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
      >
        <FaDollarSign className='w-6 h-6 text-white' />
      </div>
      <div className='p-4 text-right'>
        <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
        Total Task
        </p>
        <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
          10
        </h4>
      </div>
    </div>
   </div>
    {/* Total Orders */}
   <div className=" bg-bg-main">
   <div className='relative flex flex-col bg-clip-border rounded-xl bg-bg-main text-white  shadow-md '>
      <div
        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
      >
        <BsFillCartPlusFill className='w-6 h-6 text-white' />
      </div>
      <div className='p-4 text-right'>
        <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
        pending Task
        </p>
        <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
          20
        </h4>
      </div>
    </div>
   </div>
    {/* Total Plants */}
    <div className=" bg-bg-main">
    <div className='relative flex flex-col bg-clip-border rounded-xl bg-bg-main text-white shadow-md '>
      <div
        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
      >
        <BsFillHouseDoorFill className='w-6 h-6 text-white' />
      </div>
      <div className='p-4 text-right'>
        <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
        total payment
        </p>
        <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
          $1200
        </h4>
      </div>
    </div>
    </div>
    {/* Users Card */}
    <div className=" bg-bg-main">
    <div className='relative flex flex-col bg-clip-border rounded-xl bg-bg-main text-white shadow-md '>
      <div
        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
      >
        <FaUserAlt className='w-6 h-6 text-white' />
      </div>
      <div className='p-4 text-right'>
        <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
          Total User
        </p>
        <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
          120
        </h4>
      </div>
    </div>
    </div>
  </div>
  )
}

export default States
