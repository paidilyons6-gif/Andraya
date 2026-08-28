/** Static paper studio backdrop — no animated orbs */
export function StudioBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-paper" />
      {/* Single soft watercolor wash — fixed, subtle */}
      <div
        className="absolute -right-[20%] top-[10%] h-[70vh] w-[70vh] rounded-full opacity-[0.35] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #e8ddd4 0%, transparent 70%)' }}
      />
      <div
        className="absolute -left-[10%] bottom-[20%] h-[50vh] w-[50vh] rounded-full opacity-[0.25] blur-[100px]"
        style={{ background: 'radial-gradient(circle, #dde5da 0%, transparent 70%)' }}
      />
    </div>
  )
}
