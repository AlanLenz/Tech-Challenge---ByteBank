import MenuItem from "../MenuItem";

const SideMenu = () => {
  return (
    <div className="min-w-[180px] bg-white p-8 rounded-lg">
      <ul>
        <MenuItem label="Início" href="/home" isActive={true} />
        <MenuItem label="Transferências" href="/home" isActive={false} />
        <MenuItem label="Investimentos" href="/home" isActive={false} />
        <MenuItem label="Outros serviços" href="/home" isActive={false} hasDivider={false} />
      </ul>
    </div>
  );
};

export default SideMenu;