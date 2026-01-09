const DashboardPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 w-full h-full">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-primary aspect-video rounded-xl shadow-2xl" />
        <div className="bg-primary aspect-video rounded-xl shadow-2xl" />
        <div className="bg-primary aspect-video rounded-xl shadow-2xl" />
      </div>
      <div className="bg-primary shadow-2xl min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}

export default DashboardPage
