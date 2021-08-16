import { useState } from "react";
import Image from 'next/image';

const cart = () => {
  
  return (
    <main className="w-full">
      <div className="pt-14"></div>
      <div className="mt-16 w-1/2 ml-20 md:text-6xl mb-32 text-4xl md:mt-24">
        Shopping cart
      </div>

      {/* Cart 1 */}
      <div className="mt-32 grid grid-cols-1 gap-4 m-4 md:grid-cols-3 mb-44">
        <section className="rounded-md shadow-2xl">
          <Image src="./1.png" className="rounded-md" />
          <div>Name</div>
          <div>Discription</div>
          <div className="float-right">
            <button>
              <Image src="./remove.svg" />
            </button>
          </div>
          <div>Price</div>
        </section>
        <section className="rounded-md shadow-2xl">
          <Image src="./2.png" className="rounded-md" />
          <div>Name</div>
          <div>Discription</div>
          <div className="float-right">
            <button>
              <Image src="./remove.svg" />
            </button>
          </div>
          <div>Price</div>
        </section>
        <section className="rounded-md shadow-2xl">
          <Image src="./3.png" className="rounded-md" />
          <div>Name</div>
          <div>Discription</div>
          <div className="float-right">
            <button>
              <Image src="./remove.svg" />
            </button>
          </div>
          <div>Price</div>
        </section>
      </div>
      <div>
        <section>
          <div>Total</div>
          <div></div>
        </section>
      </div>
    </main>
  );
};

export default cart;
