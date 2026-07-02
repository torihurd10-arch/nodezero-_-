export default function Sidebar() {
  const items = [
    "Home",
    "Missions",
    "Learning",
    "Tools",
    "Career",
    "Stats",
    "Settings",
  ]

  return (
    <div className="w-20 bg-[#0d141c]/80 border-r border-haloBlue/20 flex flex-col items-center py-6 gap-6">
      {items.map((item) => (
        <div
          key={item}
          className="text-haloBlue hover:text-haloBlueSoft cursor-pointer halo-glow"
        >
          {item[0]}
        </div>
        ))}
    </div>
  )
}
