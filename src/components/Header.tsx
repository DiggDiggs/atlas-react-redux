import logo from "../../mockup/logo.png";

/**
 * Header Component
 *
 * This component renders a sticky header with a logo image at the top of the page.
 */
export const Header = () => {
  console.log("Rendering Header"); // Log when the Header component is rendered

  return (
    <header className="sticky top-0 border-b-2 border-blue bg-off-white-light pb-8 pt-8">
      <img className="logo mx-auto w-56" src={logo} alt="logo" />
    </header>
  );
};
