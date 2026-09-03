export default function ErrorComponent({message}: {message: string}) {
  return (
    <div className="border border-border rounded-sm bg-destructive/10 py-8 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-xl md:text-2xl text-destructive">{message}</h1>
      <p className="text-sm md:text-base opacity-50">Please try again</p>
    </div>
  )
}