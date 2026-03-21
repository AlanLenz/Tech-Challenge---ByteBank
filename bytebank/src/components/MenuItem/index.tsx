
interface MenuItemProps {
  label: string;
  href: string;
  isActive: boolean;
  hasDivider?: boolean;
}

const MenuItem = ({ label, href, isActive, hasDivider = true }: MenuItemProps) => {
  return (
    <li className="text-center">
      <a href={href} className={`text-[#004D61] font-${isActive ? "bold" : "normal"} text-[16px]`}>
        {label}
      </a>
      {hasDivider && <div className="w-full h-[1px] bg-[#004D61] my-4" />}
    </li>
  );
};

export default MenuItem;