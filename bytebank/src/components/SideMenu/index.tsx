import MenuItem from "../MenuItem";

const SideMenu = () => {
  return (
    <div className="min-w-[180px] bg-white p-8">
      <ul>
        <MenuItem label="Início" href="#" isActive={true} />
        <MenuItem label="Transferências" href="#" isActive={false} />
        <MenuItem label="Investimentos" href="#" isActive={false} />
        <MenuItem label="Outros serviços" href="#" isActive={false} hasDivider={false} />
      </ul>
    </div>
  );
};

export default SideMenu;