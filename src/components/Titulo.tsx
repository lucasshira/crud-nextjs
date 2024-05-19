interface TituloProps {
  children: any
}

const Titulo = (props: TituloProps) => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="flex justify-center items-center text-2xl py-2 font-bold">{props.children}</h1>
      <hr className="border-2 border-purple-500" />
    </div>
  );
}

export default Titulo;