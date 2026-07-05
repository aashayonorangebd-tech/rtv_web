import HeaderLogo from "@/components/HeaderLogo";
import HeaderTopBar from "@/components/HeaderTopBar";
import HeaderNav from "@/components/HeaderNav";

export default function Header() {
  return (
  <header className="w-full font-sans bg-white dark:bg-slate-900">
      <div className="max-w-[1350px] mx-auto relative">
        <HeaderLogo />
        <HeaderTopBar />
      </div>
      <HeaderNav />
    </header>
  );
}
