import { useJobCardToggle } from "@/app/hooks/useJobCardToggle"

const Navbar = () => {
  const { toggleCard } = useJobCardToggle();

  return (
    <div
      className="mt-3 flex h-16 w-[1200px] items-center justify-between rounded-full bg-slate-50 px-4 shadow-2xl shadow-slate-300"
      style={{ flexWrap: "nowrap", overflowX: "auto" }}
    >
      <img src="cmwlogo (1) 1.svg" alt="logo" />
      <h1>Home</h1>
      <h1>Find Jobs</h1>
      <h1>Find Talents</h1>
      <h1>About us</h1>
      <h1>Testimonials</h1>
      <button className="rounded-full bg-purple-700 px-4 py-1 text-white" onClick={toggleCard}>
        Create Jobs
      </button>
    </div>
  )
}

export default Navbar
