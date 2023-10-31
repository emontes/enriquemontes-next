import ActiveLink from "./ActiveLink";

const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 flex justify-center w-full">
      <div className=" w-11/12 h-20 flex items-center justify-between text-xl">
        <ActiveLink href="/" text="Home" />
        <ActiveLink href="/about" text="About" />
        <ActiveLink href="/resources" text="Resources" />
        <ActiveLink href="/developments" text="Developments" />
        <ActiveLink href="/contact" text="Contact" />
      </div>
    </div>
  );
};

export default Navbar;
