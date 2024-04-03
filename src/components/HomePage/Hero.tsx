import { ReactTyped } from 'react-typed'

const Hero = () => {
  return (
    <div className="bg-[url('https://t4.ftcdn.net/jpg/04/93/70/73/240_F_493707399_EqlZkAcNT4Hli5yE28d5T4eoPH2OVtgJ.jpg')] bg-cover bg-center bg-no-repeat h-screen w-screen m-0">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
    <p className="text-2xl font-bold p-2">Welcome to community</p>
    <h1 className="md:text-7xl sm:text- text-4xl font-bold md:py-6">SafeHaven</h1>
    <div className='flex justify-center items-center'>
     <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>A safe, inclusive space for</p>
      <ReactTyped 
      className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
      strings={[
        'L',
        "G",
        "B",
        "T",
        "Q",
        "I",
        "A",
        "+",

      ]}
      typeSpeed={640}
      backSpeed={10}
      loop
      />
    </div>
    <p className="md:text-2xl text-xl font-bold text-gray-800">Review venues based on safety and inclusivity plus explore all of our other amazing features!</p>
    <button className='bg-white w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
    </div>
      </div>
  )
}

export default Hero