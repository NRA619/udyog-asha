import Review from './Review'

export default function Reviews() {
    return (
        <div className="p-4 text-md">
            <span className="block text-2xl font-bold text-">Success stories</span>
            <span className="w-12 mt-2 block h-1 mb-2 rounded bg-black"></span>

            <div className="mt-4 bg-blue-500  md:p-16 p-8 shadow-xl rounded-lg grid md:grid-cols-2 gap-4">
                <Review />
                <Review />
                <Review />
                <Review />
            </div>
        </div>
    )
}
