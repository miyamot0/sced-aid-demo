type Props = {
  Title: string;
  Description?: string;
  children?: React.ReactNode;
};

export default function Hero({ Title, Description, children }: Props) {
  return (
    <div>
      <div className="container py-24">
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {Title}
          </h1>
        </div>

        {Description && (
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-xl text-muted-foreground">{Description}</p>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
