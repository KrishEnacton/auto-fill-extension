export default function SkillsElement({ item, onClick, className }: any) {
  return (
    <div className="mb-3">
      <button
      type="button"
        onClick={onClick}
        className={`text-lg py-4 px-5 font-semibold text-gray-700  w-full rounded-lg ring-1 ring-inset ring-gray-300 ${className}`}
      >
        {item}
      </button>
    </div>
  )
}
