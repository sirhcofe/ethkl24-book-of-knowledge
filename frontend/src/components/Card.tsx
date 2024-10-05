const Card = ({
  className,
  onClick,
  children,
}: {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        "border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] " +
        className
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
