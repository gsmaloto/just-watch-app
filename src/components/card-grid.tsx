type CardGridProps = {
  title: string;
  children: React.ReactNode;
};

export default function CardGrid(props: CardGridProps) {
  return (
    <div className="container">
      <h2 className="text-center text-2xl font-primary block py-2 m-4 border-b-4 border-b-primary">
        {props.title}
      </h2>
      <div className="flex gap-2 flex-wrap justify-center">
        {props.children}
      </div>
    </div>
  );
}
