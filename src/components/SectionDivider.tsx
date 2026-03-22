export default function SectionDivider() {
  return (
    <div className="w-full h-px bg-[rgba(200,16,46,0.15)] relative z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full border border-[var(--color-red)] bg-[var(--color-black)]" />
    </div>
  )
}
