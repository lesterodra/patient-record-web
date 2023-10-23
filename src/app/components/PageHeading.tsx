const PageHeading = ({ children, pageTitle }: { children: React.ReactNode, pageTitle: string  }) => {
  return (
    <div>
      <div className="pt-4 border-b-2 border-yellow-300 mb-4">
        <h1 className="text-2xl">{pageTitle}</h1>
      </div>
      {children}
    </div>
  );
};

export default PageHeading;
