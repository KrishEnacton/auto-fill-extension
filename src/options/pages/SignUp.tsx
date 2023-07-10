export const SignUp: React.FC<{}> = () => {
  return (
    <div className="mx-auto mt-8 w-full max-w-md xl:max-w-lg 2xl:max-w-xl">
      <div className="bg-white py-8 px-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <div className="block ">
            <label
              className=" block items-center text-sm font-medium leading-5 text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              aria-label="Email Address"
              id="email"
              placeholder="Email Address"
              step="1"
              type="email"
              name="email"
              className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:border-primary-base focus:outline-none focus:ring-4 focus:ring-primary-lightest disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5 "
            />
          </div>
          <div className="mt-6">
            <div className="block ">
              <label
                className=" block items-center text-sm font-medium leading-5 text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                aria-label="Password"
                id="password"
                placeholder="Password"
                step="1"
                type="password"
                name="password"
                className="form-input mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm transition focus:border-primary-base focus:outline-none focus:ring-4 focus:ring-primary-lightest disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
