import Link from "next/link";
import Image from "next/image";

const Footer = () => {

  return (
    <footer className="bg_color text-white py-6 flex flex-col items-center">
        <div className="flex justify-between items-center">
          <Image className="px-4" src="/logo-white.svg" alt="logo" width={170} height={50} />
        </div>
        <div className="px-4 text-center item-center mt-4">
            <p className="text-white flex-wrap"> This is an e-commerce demo with Stripe Checkout</p>
            <div className="flex flex-col items-center"> 
            <Link href="https://github.com/wimonkhae/cozy-threads"
                className="flex items-center space-x-2 hover:text-gray-300">
               
                    <button className="mr-2 mt-2 flex items-center space-x-2 hover:text-gray-300">
                        <Image src="/icons/github.png" alt='github' width={24} height={24} />
                    </button>
                    <p className="mr-2 mt-2 flex flex-col items-center">Source Code</p>
            </Link>  
            </div>
        </div>  
    </footer>
  )
}

export default Footer
