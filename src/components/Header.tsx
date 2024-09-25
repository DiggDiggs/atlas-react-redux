import logo from "../../mockup/logo.png";


export const Header = () => {
  return (
    <header className="sticky top-0 border-b-2 border-blue bg-off-white-light pb-8 pt-8">
      <img className="logo mx-auto w-56" src={logo} alt="logo" />
    </header>
  );
};
