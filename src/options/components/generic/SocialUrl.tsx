export default function SocialUrl({ label, baseUrl, value, onChange }: any) {
  return (
    <div className="w-[600px]">
      <div className="block text-lg font-medium leading-6 text-gray-900 !text-left">{label}</div>
      <div className="mt-2 w-[800px]">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset bg-white focus-within:ring-base">
          <span className="flex select-none rounded-l-md items-center px-3 bg-gray-100 border-y border-l border-gray-300 text-gray-500 sm:text-lg">
            {baseUrl}
          </span>
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="border-0 bg-white text-gray-900 placeholder:text-gray-300 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-base sm:leading-6 px-5 py-5 font-semibold text-lg !w-[100%] rounded-r-md"
            placeholder="www.example.com"
          />
        </div>
      </div>
    </div>
  )
}
