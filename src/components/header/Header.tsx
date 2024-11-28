import CompanyLogo from "./CompanyLogo";
import CatalogNavigation from "./CatalogNavigation";
import SearchInput from "./SearchInput";
import LoginAction from "./action/LoginAction";
import PingAction from "./action/PingAction";
import ShoppingCarAction from "./action/ShoppingCarAction";

type Props = {};

const Header = (props: Props) => {
  return (
    <section className="h-16 w-full">
      <div className="container mx-auto flex justify-around items-center h-full w-full">
        <CompanyLogo />

        <CatalogNavigation />

        <SearchInput />

        <div className="flex gap-6">
          <LoginAction />
          <PingAction />
          <ShoppingCarAction />
        </div>
      </div>
    </section>
  );
};

export default Header;
