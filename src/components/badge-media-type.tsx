type BadgeMediaTypeProps = {
  text: string;
};

export default function BadgeMediaType(props: BadgeMediaTypeProps) {
  return (
    <div className="relative w-64 h-64 bg-blue-500 clip-hexagon flex items-center justify-center text-white text-center p-4">
      <span className="text-lg">{props.text}</span>
    </div>
  );
}
