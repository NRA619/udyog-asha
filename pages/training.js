import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import Link from 'next/Link';
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';

const training = () => {
  return (
    <main className="">
      <div className="pt-14 bg-gray-100"></div>
      <div className="w-full bg-yellow-500 h-80">
        <div className="float-left h-80 w-2/5 bg-blue-500 scale-150 hidden md:block">
          <div className="bg-white py-2 m-6 rounded-full ">
            <SearchSharpIcon
              fontSize="medium"
              className="ml-4"
            ></SearchSharpIcon>
            Search..
          </div>
        </div>
      </div>

      <div className="bg-blue-500 m-6 rounded-full w-5/6 md:hidden py-2 px-2">
        <SearchSharpIcon fontSize="medium" className="ml-2"></SearchSharpIcon>
        Search..
      </div>

      {/* Category1 */}
      <div className="mt-32 mx-5">
            <span className="block text-2xl font-bold text-">Category 1</span>
            <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>
      </div>
      <div className="grid grid-cols-1 gap-4 m-4 md:grid-cols-3">
        <section className="rounded-md shadow-2xl">
          <img src="./1.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          
          </div>
        </section>
        <section className="rounded-md shadow-2xl">
          <img src="./2.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>

          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
        <section className="rounded-md shadow-2xl">
          <img src="./3.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
      </div>
      <button className="ml-5 text-xs border shadow-md rounded-md bg-blue-300 px-2 py-1 focus:outline-none focus:bg-blue-500 focus:text-white">
        SHOW MORE
      </button>

      {/* Category2 */}
      <div className="mt-32 mx-5">
            <span className="block text-2xl font-bold text-">Category 2</span>
            <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>
      </div>
      <div className="grid grid-cols-1 gap-4 m-4 md:grid-cols-3">
        <section className="rounded-md shadow-2xl">
          <img src="./1.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
        <section className="rounded-md shadow-2xl">
          <img src="./2.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
        <section className="rounded-md shadow-2xl">
          <img src="./3.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
      </div>
      <button className="ml-5 text-xs border shadow-md rounded-md bg-blue-300 px-2 py-1 focus:outline-none focus:bg-blue-500 focus:text-white">
        SHOW MORE
      </button>

      {/* Category3 */}
      <div className="mt-32 mx-5">
      <span className="block text-2xl font-bold text-">Category 3</span>
            <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>
      </div>
      <div className="grid grid-cols-1 gap-4 m-4 md:grid-cols-3">
        <section className="rounded-md shadow-2xl">
          <img src="./1.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
        <section className="rounded-md shadow-2xl">
          <img src="./2.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
        <section className="rounded-md shadow-2xl">
          <img src="./3.png" className="rounded-md" />
          <div className="m-2 float-right shadow-2xl">
            <button className="">
              <Link href="/cart">
                <AddShoppingCartSharpIcon color="primary" fontSize="large" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </Link>
            </button>
          </div>
          <div className="mx-2">
          <div>Name</div>
          <div>Discription</div>
          
          <div>Price</div>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-white border  text-black hover:text-white hover:bg-black shadow-md rounded-md px-4 py-1 mb-2">Mode</button>
          </div>
        </section>
      </div>
      <button className="ml-5 text-xs border shadow-md rounded-md bg-blue-300 px-2 py-1 focus:outline-none focus:bg-blue-500 focus:text-white mb-32">
        SHOW MORE
      </button>
    </main>
  );
};

export default training;
