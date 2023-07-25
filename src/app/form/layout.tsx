const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex-1 p-20 justify-center bg-slate-300 text-slate-700">
        Some forms go here
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </div>
    </div>
  );
};

export default Layout;
