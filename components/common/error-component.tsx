export default function ErrorComponent({message}: {message: string}) {
  return (
    <div className="border border-border rounded-sm bg-destructive/10 p-8 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-xl md:text-2xl text-center text-destructive">{message}</h1>
      <p className="text-sm md:text-base text-center opacity-50">Please try again</p>
    </div>
  )
}