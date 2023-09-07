import Sidebar from "@/components/Sidebar"


export default function RootLayout({
    children,
  }:{
      children: React.ReactNode
  }) {
      return (
        <>
        <div className="flex ">
        <div>
            <Sidebar/>
        </div>
      <div className="ml-[300px]">
      {children}
      </div>
        </div>
      </>
      )
  }